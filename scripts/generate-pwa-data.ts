#!/usr/bin/env node

import "dotenv/config";

import axios from "axios";
import { Octokit } from "@octokit/rest";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";

import type { AppItem, AppsCollectionResult } from "../src/types/app";

const config = {
  organization: process.env.ORGANIZATION,
  githubToken: process.env.GITHUB_TOKEN,
  outputDir: process.env.OUTPUT_DIR || join(process.cwd(), "public", "data"),
  outputFile: "pwa-data.json",
  manifestPath: "manifest.webmanifest",
  timeout: 10000,
};

if (!config.githubToken) {
  console.warn("❌ GITHUB_TOKEN environment variable is required");
  console.warn(
    "💡 You can get a token from: https://github.com/settings/tokens"
  );
}

const octokit = new Octokit({
  auth: config.githubToken,
});

async function fetchManifest(repo) {
  if (!repo.homepage) return null;

  let baseUrl = repo.homepage;
  if (!baseUrl.startsWith("http")) {
    baseUrl = `https://${baseUrl}`;
  }
  baseUrl = baseUrl.replace(/\/$/, "");

  const url = `${baseUrl}/${config.manifestPath}`;

  try {
    console.log(`  🌐 Trying: ${url}`);
    const response = await axios.get(url, {
      timeout: config.timeout,
      validateStatus: (status) => status === 200,
      headers: {
        "User-Agent": "PWABucket-DataCollector/1.0",
      },
    });

    if (response.data) {
      const manifest =
        typeof response.data === "string"
          ? JSON.parse(response.data)
          : response.data;

      manifest._meta = {
        manifestUrl: url,
        fetchedAt: new Date().toISOString(),
      };

      return manifest;
    }
  } catch (error) {
    console.log(`  ❌ Failed: ${error.message}`);
  }

  return null;
}

async function collectPWAData() {
  try {
    console.log(
      `🔍 Searching for PWA repositories in organization: ${config.organization}`
    );

    const searchResult = await octokit.search.repos({
      q: `pwa in:topics org:${config.organization}`,
      sort: "updated",
      order: "desc",
      per_page: 100,
    });

    console.log(
      `📦 Found ${searchResult.data.items.length} repositories with 'pwa' topic`
    );

    const pwaData: AppsCollectionResult = {
      generatedAt: new Date().toISOString(),
      organization: config.organization as string,
      totalRepositories: searchResult.data.items.length,
      repositories: [],
      _meta: {
        version: "1.0.0",
        generator: "PWABucket Data Collector",
        config: {
          manifestPath: config.manifestPath,
        },
      },
    };

    await Promise.allSettled(
      searchResult.data.items.map(async (repo) => {
        console.log(`\n📋 Processing: ${repo.full_name}`);

        const repoData: AppItem = {
          repository: {
            id: repo.id,
            name: repo.name,
            fullName: repo.full_name,
            htmlUrl: repo.html_url,
            description: repo.description,
            stargazersCount: repo.stargazers_count,
            forksCount: repo.forks_count,
            language: repo.language,
            topics: repo.topics,
            createdAt: repo.created_at,
            updatedAt: repo.updated_at,
            pushedAt: repo.pushed_at,
            homepage: repo.homepage,
            hasPages: repo.has_pages,
            defaultBranch: repo.default_branch,
          },
          manifest: null,
          errors: [],
        };

        if (repo.homepage) {
          try {
            console.log(`  🌍 Searching site for manifest...`);
            const manifest = await fetchManifest(repo);
            if (manifest) {
              repoData.manifest = manifest;
              console.log(
                `  ✅ Found live manifest at: ${manifest._meta.manifestUrl}`
              );
            } else {
              console.log(`  ❌ No live manifest found`);
            }
          } catch (error) {
            console.log(`  💥 Error fetching live manifest: ${error.message}`);
            repoData.errors.push({
              type: "live_manifest",
              message: (error as Error).message,
            });
          }
        } else {
          console.log(`  ℹ️  No homepage URL configured`);
        }

        pwaData.repositories.push(repoData);
      })
    );

    if (!existsSync(config.outputDir)) {
      mkdirSync(config.outputDir, { recursive: true });
      console.log(`📁 Created output directory: ${config.outputDir}`);
    }

    const outputPath = join(config.outputDir, config.outputFile);
    writeFileSync(outputPath, JSON.stringify(pwaData, null, 2));

    console.log(`\n🎉 PWA data collection completed!`);
    console.log(`📄 Data saved to: ${outputPath}`);

    const withManifest = pwaData.repositories.filter((r) => r.manifest).length;
    const withErrors = pwaData.repositories.filter(
      (r) => r.errors.length > 0
    ).length;

    console.log(`\n📊 Summary:`);
    console.log(`  • Total repositories: ${pwaData.totalRepositories}`);
    console.log(`  • With manifest: ${withManifest}`);
    console.log(`  • With errors: ${withErrors}`);

    if (withErrors > 0) {
      console.log(`\n⚠️  Repositories with errors:`);
      pwaData.repositories
        .filter((r) => r.errors.length > 0)
        .forEach((r) => {
          console.log(
            `  • ${r.repository.fullName}: ${r.errors
              .map((e) => e.type)
              .join(", ")}`
          );
        });
    }

    return {
      success: true,
      outputPath,
      summary: {
        total: pwaData.totalRepositories,
        withManifest: withManifest,
        withErrors,
      },
    };
  } catch (error) {
    console.error("💥 Error collecting PWA data:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log("🚀 PWABucket Data Collector Starting...\n");

  collectPWAData()
    .then((result) => {
      if (result.success) {
        console.log(`\n✅ Collection completed successfully!`);
        process.exit(0);
      } else {
        console.error(`\n❌ Collection failed: ${result.error}`);
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error("💥 Unexpected error:", error);
      process.exit(1);
    });
}

export default {
  collectPWAData,
  config,
};
