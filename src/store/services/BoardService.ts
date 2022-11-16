import { IBoard } from 'models';
import { commonApi } from './common.api';

export const BoardAPI = commonApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBoard: build.query<IBoard[], void>({
      query: () => ({ url: `/boards/` }),
      // providesTags: (result) => ['User'],
    }),

    getBoardById: build.query<IBoard, string>({
      query: (id) => ({ url: `boards/${id}` }),
    }),
  }),
});
