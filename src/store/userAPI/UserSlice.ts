import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

export interface IUserReg {
  name: string;
  login: string;
  password: string;
}

export interface IUser {
  name: string;
  login: string;
  id: string;
}

type TApiResolve = {
  userInfo: IUser;
  isLoading: boolean;
  error: string | null | Error;
};
const initialState: TApiResolve = {
  isLoading: false,
  userInfo: {
    id: '',
    name: '',
    login: '',
  },
  error: '',
};

export const fetchUsers = createAsyncThunk('user/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get<IUser>('https://jsonplaceholder.typicode.com/user2s');
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось загрузить пользователей');
  }
});

const userSliceReg = createSlice({
  name: 'userReg',
  initialState,
  reducers: {
    set: (state, action) => {
      return { ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder;
    // .addCase(registerUser.pending, (state) => {
    //   state.error = null;
    // })
    // .addCase(registerUser.fulfilled, (state, action) => {
    //   state.userInfo = action.payload;
    //   console.log(action.payload);
    // })
    // .addCase(registerUser.rejected, (state) => {
    //   state.loading = true;
    // });
  },
});

export default userSliceReg.reducer;
export const { set } = userSliceReg.actions;
