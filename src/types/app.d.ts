import type { RestEndpointMethodTypes } from "@octokit/rest";
import type { WebAppManifest } from "web-app-manifest";

type RepositoryResult =
  RestEndpointMethodTypes["search"]["repos"]["response"]["data"]["items"][number];

export type RepositoryItem = {
  id: RepositoryResult["id"];
  name: RepositoryResult["name"];
  fullName: RepositoryResult["full_name"];
  htmlUrl: RepositoryResult["html_url"];
  description: RepositoryResult["description"];
  stargazersCount: RepositoryResult["stargazers_count"];
  forksCount: RepositoryResult["forks_count"];
  language: RepositoryResult["language"];
  topics: RepositoryResult["topics"];
  createdAt: RepositoryResult["created_at"];
  updatedAt: RepositoryResult["updated_at"];
  pushedAt: RepositoryResult["pushed_at"];
  homepage: RepositoryResult["homepage"];
  hasPages: RepositoryResult["has_pages"];
  defaultBranch: RepositoryResult["default_branch"];
};

export type AppItem = {
  repository: RepositoryItem;
  manifest: WebAppManifest | null;
  errors: { type: string; message: string }[];
};

export type AppsCollectionResult = {
  generatedAt: string;
  organization: string;
  totalRepositories: number;

  repositories: AppItem[];

  _meta: {
    version: string;
    generator: string;
    config: {
      manifestPath: string;
    };
  };
};
