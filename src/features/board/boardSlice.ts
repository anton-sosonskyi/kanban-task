import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Issue } from "../../types/Issue";
import { Columns } from "../../enums/Columns";

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

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    initBoard: (state, action: PayloadAction<BoardState>) => {
      state.name = action.payload.name;
      state.columns = action.payload.columns;
    },

    reoder: (state, action: PayloadAction<{source: string, destination: string, sourceIndex: number, destinationIndex: number}>) => {
      const { source, destination, sourceIndex, destinationIndex} = action.payload;
      const itemToMove = state.columns[source as Columns].splice(sourceIndex, 1)[0];
      state.columns[destination as Columns].splice(destinationIndex, 0, itemToMove);
    },
  }
});

export const { initBoard, reoder } = boardSlice.actions;

export default boardSlice.reducer;
