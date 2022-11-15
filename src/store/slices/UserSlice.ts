import { createSlice } from '@reduxjs/toolkit';
import { IInitialState } from 'models';
import { Decoder } from 'utils/Decoder';

let initialStateWithToken: IInitialState = {
  name: '',
  token: '',
  id: '',

  allUser: [],
};

if (localStorage.getItem('token')) {
  const userDecodedInfo = Decoder(localStorage.getItem('token') as string);
  initialStateWithToken = {
    name: userDecodedInfo.login,
    token: localStorage.getItem('token') as string,
    id: userDecodedInfo.id,
    allUser: [],
  };
}

const initialState = initialStateWithToken;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setAllUser(state, action) {
      state.allUser = action.payload;
    },
    setUser(state, action) {
      return { ...action.payload };
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setId(state, action) {
      state.id = action.payload;
    },
    removeUser(state) {
      state.name = '';
      state.token = '';
      state.id = '';
      state.password = '';
    },
  },
});

export const { setToken, setUser, setName, removeUser, setId, setAllUser } = userSlice.actions;
export default userSlice.reducer;
