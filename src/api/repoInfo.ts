import { Octokit } from "@octokit/rest";
import { getRepoName } from "../utils/helpers";

const octokit = new Octokit();

export const getRepoInfo = async (repoUrl: string) => {
  const repoNames = getRepoName(repoUrl).split('/');
  return await octokit.request(`GET /repos/${repoUrl}`, {
    owner: repoNames[0],
    repo: repoNames[1],
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    },
  }).then(resp => resp.data);
};
