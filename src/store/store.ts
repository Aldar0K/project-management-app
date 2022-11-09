import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { userAPI } from 'store/services/UserService';
import userSlice from 'store/services/UserSlice';

export const store = configureStore({
  reducer: { user: userSlice, [userAPI.reducerPath]: userAPI.reducer },
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
