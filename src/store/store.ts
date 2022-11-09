import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { userAPI } from 'store/services/UserService';

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
