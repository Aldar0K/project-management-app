import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { userAPI } from 'store/services/UserService';
import userSliceReg from './userAPI/UserSlice';

// export const rootReducer = combineReducers({
//   [userAPI.reducerPath]: userAPI.reducer,
// });

// export const setupStore = () => {
//   return configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userAPI.middleware),
//   });
// };

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userAPI.middleware),
});
// export const store = setupStore();
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
// export type RootReducerState = ReturnType<typeof rootReducer>;
// export type AppStore = ReturnType<typeof setupStore>;
