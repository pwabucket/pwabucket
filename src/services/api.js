import { octokit } from "./octokit";

export const api = {
  listApps: () =>
    octokit.search.repos({
      q: `props.PWA_IS_PUBLISHED:true org:${import.meta.env.VITE_OCTOKIT_ORG}`,
    }),
};
