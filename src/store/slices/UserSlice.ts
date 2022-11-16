import { createSlice } from '@reduxjs/toolkit';
import { IInitialState } from 'models';
import { Decoder } from 'utils/Decoder';

let initialStateWithToken: IInitialState = {
  name: '',
  login: '',
  token: '',
  id: '',
  allUser: [],
};

if (localStorage.getItem('token')) {
  const userDecodedInfo = Decoder(localStorage.getItem('token') as string);
  initialStateWithToken = {
    name: '',
    token: localStorage.getItem('token') as string,
    id: userDecodedInfo.id,
    allUser: [],
    login: userDecodedInfo.login,
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
    setLogin(state, action) {
      state.login = action.payload;
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
      state.login = '';
      state.token = '';
      state.id = '';
      state.password = '';
    },
  },
});

export const { setToken, setUser, setName, removeUser, setId, setAllUser, setLogin } =
  userSlice.actions;
export default userSlice.reducer;
