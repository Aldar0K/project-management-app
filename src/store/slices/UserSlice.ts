import { createSlice } from '@reduxjs/toolkit';
import { Decoder } from 'utils/Decoder';

let initialStateWithToken = {
  login: '',
  token: '',
  id: '',
  password: '',
};

if (localStorage.getItem('token')) {
  const userDecodedInfo = Decoder(localStorage.getItem('token') as string);
  initialStateWithToken = {
    login: userDecodedInfo.login,
    token: localStorage.getItem('token') as string,
    id: userDecodedInfo.userId,
    password: '',
  };
}

const initialState = initialStateWithToken;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin(state, action) {
      state.login = action.payload;
    },
    setUser(state, action) {
      return { ...action.payload };
    },
    setPass(state, action) {
      state.password = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setId(state, action) {
      state.id = action.payload;
    },
    removeUser(state) {
      state.login = '';
      state.token = '';
      state.id = '';
      state.password = '';
    },
  },
});

export const { setToken, setUser, setLogin, removeUser, setPass, setId } = userSlice.actions;
export default userSlice.reducer;
