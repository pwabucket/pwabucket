import { octokit } from "./octokit";

export const api = {
  listApps: () =>
    octokit.search.repos({
      q: `pwa in:topics org:${import.meta.env.VITE_OCTOKIT_ORG}`,
    }),
};
