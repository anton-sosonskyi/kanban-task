import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getIssues } from "../../api/issues";
import { Issue } from "../../types/Issue";
import { getRepoName, normalizeIssues } from "../../utils/helpers";
import { getRepoInfo } from "../../api/repoInfo";

type RepoState = {
  isError: boolean;
  issues: Issue[];
  starsCount: number;
  repoURL: string;
  loaded: boolean;
  isLoading: boolean;
}

export const loadRepoData = createAsyncThunk('repo/fetch', async (url: string) => {
  const repoFullName = getRepoName(url);
  const [repoInfo, issuesFromServer] = await Promise.all([getRepoInfo(repoFullName), getIssues(repoFullName)]);

  return {
    starsCount: repoInfo.stargazers_count,
    repoURL: repoInfo.html_url,
    issues: issuesFromServer,
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
    builder.addCase(loadRepoData.pending, (state) => {
      state.loaded = false;
      state.isError = false;
      state.isLoading = true;
    });

    builder.addCase(loadRepoData.fulfilled, (state, action) => {
      state.loaded = true;
      state.isError = false;
      state.isLoading = false;
      state.issues = normalizeIssues(action.payload.issues);
      state.starsCount = action.payload.starsCount;
      state.repoURL = action.payload.repoURL;
    });

    builder.addCase(loadRepoData.rejected, (state) => {
      console.log('erorr')
      state.loaded = true;
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export default repoSlice.reducer;
