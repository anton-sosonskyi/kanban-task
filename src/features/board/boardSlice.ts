import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Issue } from "../../types/Issue";
import { Columns } from "../../enums/Columns";
import { saveToSessionStorage } from "../../utils/helpers";
import { AddAction, ReoderAction } from "../../types/Actions";

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

    reoder: (state, action: PayloadAction<ReoderAction>) => {
      const { source, destination, sourceIndex, destinationIndex } = action.payload;
      const itemToMove = state.columns[source as Columns].splice(sourceIndex, 1)[0];
      state.columns[destination as Columns].splice(destinationIndex, 0, itemToMove);
    },

    add: (state, action: PayloadAction<AddAction>) => {
      const { source, destination, sourceIndex } = action.payload;
      const itemToMove = state.columns[source as Columns].splice(sourceIndex, 1)[0];
      state.columns[destination as Columns].push(itemToMove);
    },

    save: (state) => {
      saveToSessionStorage(state.name, state.columns);
    },
  }
});

export const { initBoard, reoder, add, save } = boardSlice.actions;

export default boardSlice.reducer;
