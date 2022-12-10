import { createSlice } from '@reduxjs/toolkit';
import { ITask } from 'models';

interface IBoardState {
  id: string;
  title: string;
  columns: {
    id: string;
    title: string;
    order: number;
    tasks: ITask[];
  }[];
  owner?: string;
  users?: string[];
}

const initialState: IBoardState = {
  id: '',
  title: '',
  columns: [],
  owner: '',
  users: [],
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    // TODO type the reducer or split all setters.
    setBoard: (state, action) => {
      state = action.payload;
    },
    setColumns: (state, action) => {
      state.columns = action.payload;
    },
    clearBoard: (state) => {
      state.id = '';
      state.title = '';
      state.columns = [];
      state.owner = '';
      state.users = [];
    },
  },
});

export const { setBoard, clearBoard } = boardSlice.actions;
export default boardSlice.reducer;
