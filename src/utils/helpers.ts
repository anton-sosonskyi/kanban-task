import { Issue } from "../types/Issue";

export const getRepoLinks = (url: string) => {

};

export const getRepoName = (url: string) => {
  const index = url.search(/(\/)\w+(\/)\w+/g) + 1;
  return url.slice(index);
};

export const getDaysPass = (date: string) => {
  const diff = new Date().getTime() - new Date(date).getTime();
  return Math.ceil(diff / (1000 * 3600 * 24));
};

export function saveToSessionStorage<T>(key: string, data: T) {
  sessionStorage.setItem(key, JSON.stringify(data));
}

export function getFromSessionStorage(key: string) {
  const data = sessionStorage.getItem(key);

  return data ? JSON.parse(data) : null;
}

export const prepareBoard = (issues: Issue[]) => {
  const todo = issues.filter(issue => issue.state === 'open');
  const inProgress = issues.filter(issue => issue.state === 'open' && issue.assigne);
  const done = issues.filter(issue => issue.state === 'closed');

  return { todo, inProgress, done };
};
