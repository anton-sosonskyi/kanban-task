export type Issue = {
  id: number;
  title: string;
  number: number;
  state: string;
  user: {[key: string]: any};
  comments: number;
  created_at: string;
  assignee: {[key: string]: any};
}
