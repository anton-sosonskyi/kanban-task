import {
  Action,
  ThunkAction,
  configureStore,
} from '@reduxjs/toolkit';
import repoReduser from '../features/repo/repoSlice';
import boardReducer from '../features/board/boardSlice';

export const store = configureStore({
  reducer: {
    repo: repoReduser,
    board: boardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
