import { IBoard, IBoardData, IBoardParams } from 'models';
import { commonApi } from './common.api';

export const BoardAPI = commonApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBoard: build.query<IBoard[], void>({
      query: () => ({ url: `/boards/` }),
      providesTags: (result) => [
        'Board',
        ...(result ? result.map(({ _id }) => ({ type: 'Board' as const, _id: _id })) : []),
      ],
    }),

    getBoardById: build.query<IBoard, string>({
      query: (boardId) => ({ url: `boards/${boardId}` }),
      providesTags: (result, error, arg) => [{ type: 'Board' as const, _id: arg }],
    }),

    getBoardsByUserId: build.query<IBoard[], string>({
      query: (userId) => ({ url: `boardsSet/${userId}` }),
      providesTags: (result) => [
        'Board',
        ...(result ? result.map(({ _id }) => ({ type: 'Board' as const, _id: _id })) : []),
      ],
    }),
    createBoard: build.mutation<IBoard, IBoardData>({
      query: (boardData) => ({
        url: `/boards`,
        method: 'POST',
        body: boardData,
      }),
      invalidatesTags: ['Board'],
    }),
    updateBoardById: build.mutation<IBoard, IBoardParams>({
      query: ({ id, data }) => ({
        url: `/boards/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Board' as const, _id: arg.id }],
    }),
    deleteBoardById: build.mutation<IBoard[], string>({
      query: (boardId) => ({ url: `boards/${boardId}`, method: 'DELETE' }),
      invalidatesTags: (result, error, arg) => [{ type: 'Board' as const, _id: arg }],
    }),
  }),
});
