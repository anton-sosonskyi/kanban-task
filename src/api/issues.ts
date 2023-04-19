import { Octokit } from "@octokit/core";
import { getRepoName } from '../utils/helpers';
import { Issue } from "../types/Issue";

const octokit = new Octokit();

export const getIssues = async (repoUrl: string): Promise<Issue[]> => {
  const repoNames = getRepoName(repoUrl).split('/');

  const serverIssues = await octokit.request(`GET /repos/${repoUrl}/issues`, {
    owner: repoNames[0],
    repo: repoNames[1],
    state: 'all',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    },
  });
 
  return serverIssues.data;
};
