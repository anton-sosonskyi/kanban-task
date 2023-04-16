import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Issue } from "../../types/Issue";

type BoardState = {
  name: string;
  columns: {
    todo: Issue[];
    inProgress: Issue[];
    done: Issue[];
  }
}

const initialState: BoardState = {
  name: '',
  columns: {
    todo: [],
    inProgress: [],
    done: [],
  }
}

// const init = createAsyncThunk('board/init', async (issues: Issue[]) => {

// })

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    initBoard: (state, action: PayloadAction<BoardState>) => {
      console.log(action.payload.columns)
      state.name = action.payload.name;
      state.columns = action.payload.columns;
    }
  }
});

export const { initBoard } = boardSlice.actions;

export default boardSlice.reducer;
