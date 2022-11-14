import { createSlice } from '@reduxjs/toolkit';
import { IBoard } from 'models';

const initialState: IBoard = {
  _id: '',
  title: '',
  owner: '',
  users: [],
};

const boardSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAllBoards(state, action) {
      return { ...action.payload };
    },
    removeBoard(state) {
      state._id = '';
      state.title = '';
      state.owner = '';
      state.users = [];
    },
  },
});

export const { setAllBoards, removeBoard } = boardSlice.actions;
export default boardSlice.reducer;
