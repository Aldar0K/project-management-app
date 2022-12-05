import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import boardSlice from 'store/slices/BoardSlice';
import userSlice from 'store/slices/UserSlice';
import { commonApi } from './services/common.api';

export const store = configureStore({
  reducer: {
    user: userSlice,
    board: boardSlice,
    [commonApi.reducerPath]: commonApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(commonApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
