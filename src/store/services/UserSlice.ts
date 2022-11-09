import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  token: '',
  id: '',
  pass: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setUser(state, action) {
      state.pass = action.payload;
    },
    setPass(state, action) {
      state.pass = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setId(state, action) {
      state.id = action.payload;
    },
    removeUser(state) {
      state.email = '';
      state.token = '';
      state.id = ''; //null
      state.pass = ''; //null
    },
  },
});

export const { setToken, setUser, setEmail, removeUser, setPass, setId } = userSlice.actions;
export default userSlice.reducer;
