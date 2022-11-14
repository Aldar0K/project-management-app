import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { AuthorizationAPI } from 'store/services/AuthorizationService';
import { UsersAPI } from 'store/services/UserService';
import userSlice from 'store/slices/UserSlice';
import { commonApi } from './services/common.api';

export const store = configureStore({
  reducer: {
    user: userSlice,
    [commonApi.reducerPath]: commonApi.reducer,
    [AuthorizationAPI.reducerPath]: AuthorizationAPI.reducer,
    [UsersAPI.reducerPath]: UsersAPI.reducer,
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
