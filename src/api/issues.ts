import { Issue } from '../types/Issue';
import { client } from '../utils/fetchClient';

export const getIssues = (repoUrl: string) => {
  return client.get<Issue[]>(`${repoUrl}/issues?state=all`);
};
