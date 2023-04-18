import { Octokit } from "@octokit/core";
import { getRepoName } from '../utils/helpers';

const octokit = new Octokit();

export const getIssues = async (repoUrl: string) => {
  const repoNames = getRepoName(repoUrl).split('/');
  return await octokit.request(`GET /repos/${repoUrl}/issues`, {
    owner: repoNames[0],
    repo: repoNames[1],
    state: 'all',
    assignee: '*',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    },
  }).then(resp => resp.data);
};
