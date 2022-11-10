import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  token: '',
  id: '',
  password: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setUser(state, action) {
      state.password = action.payload;
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
      state.email = '';
      state.token = '';
      state.id = ''; //null
      state.password = ''; //null
    },
  },
});

export const { setToken, setUser, setEmail, removeUser, setPass, setId } = userSlice.actions;
export default userSlice.reducer;
