import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getIssues } from "../../api/issues";
import { Issue } from "../../types/Issue";
import { getRepoName } from "../../utils/helpers";

type RepoState = {
  isError: boolean;
  issues: Issue[];
  ownerURL: string;
  repoURL: string;
  loaded: boolean
}

export const loadIssues = createAsyncThunk('repo/fetch', async (url: string) => {
  const repoFullName = getRepoName(url);
  const data = await getIssues(repoFullName);

  const issues = data.map((item) => {
    const { id, title, number, user, comments, state, assigne, created_at } = item;
    return { id, title, number, user: user.type, comments, state, assigne, created_at };
  });

  return issues;
});

const initialState: RepoState = {
  issues: [],
  ownerURL: '',
  repoURL: '',
  isError: false,
  loaded: false,
};

const repoSlice = createSlice({
  name: 'repo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadIssues.pending, (state) => {
      state.loaded = false;
      state.isError = false;
    });

    builder.addCase(loadIssues.fulfilled, (state, action) => {
      state.loaded = true;
      state.isError = false;
      state.issues = action.payload;
    });

    builder.addCase(loadIssues.rejected, (state) => {
      state.loaded = true;
      state.isError = true;
    });
  },
});

export default repoSlice.reducer;
