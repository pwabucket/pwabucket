import { Octokit } from "@octokit/rest";

export const octokit = new Octokit({
  auth: import.meta.env.VITE_OCTOKIT_AUTH,
});
