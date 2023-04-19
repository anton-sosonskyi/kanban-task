import { Octokit } from "@octokit/rest";
import { getRepoName } from "../utils/helpers";
import { RepoData } from "../types/RepoData";

const octokit = new Octokit();

export const getRepoInfo = async (repoUrl: string): Promise<RepoData> => {
  const repoNames = getRepoName(repoUrl).split('/');
  const serverData = await octokit.request(`GET /repos/${repoUrl}`, {
    owner: repoNames[0],
    repo: repoNames[1],
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    },
  });

  return serverData.data;
};
