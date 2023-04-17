import { RepoData } from "../types/RepoData";
import { client } from "../utils/fetchClient";

export const getRepoInfo = (repoUrl: string) => {
  return client.get<RepoData>(`${repoUrl}`);
};
