import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getIssues } from "../../api/issues";
import { Issue } from "../../types/Issue";
import { getRepoName } from "../../utils/helpers";
import { getRepoInfo } from "../../api/repoInfo";

type RepoState = {
  isError: boolean;
  issues: Issue[];
  starsCount: number;
  repoURL: string;
  loaded: boolean;
  isLoading: boolean;
}

export const loadIssues = createAsyncThunk('repo/fetch', async (url: string) => {
  const repoFullName = getRepoName(url);

  const [repoInfo, issuesFromServer] = await Promise.all([getRepoInfo(repoFullName), getIssues(repoFullName)]);

  const issues: Issue[] = issuesFromServer.map(({ id,
    title,
    number,
    user,
    comments,
    state,
    assignee,
    created_at,
  }: Issue) => {
    return {
      id,
      title,
      number,
      user: user.type,
      comments,
      state,
      assignee: assignee.login,
      created_at,
    };
  });

  return {
    issues,
    starsCount: repoInfo.stargazers_count,
    repoURL: repoInfo.html_url,
  };
});

const initialState: RepoState = {
  issues: [],
  starsCount: 0,
  repoURL: '',
  isError: false,
  loaded: false,
  isLoading: false,
};

const repoSlice = createSlice({
  name: 'repo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadIssues.pending, (state) => {
      state.loaded = false;
      state.isError = false;
      state.isLoading = true;
    });

    builder.addCase(loadIssues.fulfilled, (state, action) => {
      state.loaded = true;
      state.isError = false;
      state.isLoading = false;
      state.issues = action.payload.issues;
      state.starsCount = action.payload.starsCount;
      state.repoURL = action.payload.repoURL;
    });

    builder.addCase(loadIssues.rejected, (state) => {
      state.loaded = true;
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export default repoSlice.reducer;
