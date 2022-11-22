import { IBoard, IBoardData, IBoardParams, IColumn, ITask } from 'models';
import { commonApi } from './common.api';

export const BoardAPI = commonApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBoards: build.query<IBoard[], void>({
      query: () => ({ url: `/boards/` }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Board' as const, _id })),
              { type: 'Board', id: 'LIST' },
            ]
          : [{ type: 'Board', id: 'LIST' }],
    }),
    getBoardById: build.query<IBoard, string>({
      query: (boardId) => ({ url: `boards/${boardId}` }),
      providesTags: (result, error, id) => [{ type: 'Board', id }],
    }),
    getBoardsByUserId: build.query<IBoard[], string>({
      query: (userId) => ({ url: `boardsSet/${userId}` }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Board' as const, _id })),
              { type: 'Board', id: 'LIST' },
            ]
          : [{ type: 'Board', id: 'LIST' }],
    }),
    createBoard: build.mutation<IBoard, IBoardData>({
      query: (body) => ({
        url: `/boards`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Board'],
    }),
    updateBoardById: build.mutation<IBoard, IBoardParams>({
      query: ({ id, body }) => ({
        url: `/boards/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, _id) => [{ type: 'Board' as const, _id }],
    }),
    deleteBoardById: build.mutation<IBoard[], string>({
      query: (boardId) => ({ url: `boards/${boardId}`, method: 'DELETE' }),
      invalidatesTags: (result, error, arg) => [{ type: 'Board' as const, _id: arg }],
    }),

    // TODO move to ColumnServise?
    getColumnsByBoardId: build.query<IColumn[], string>({
      query: (boardId) => ({ url: `/boards/${boardId}/columns` }),
      providesTags: (result) => [
        'Column',
        ...(result ? result.map(({ _id }) => ({ type: 'Column' as const, _id: _id })) : []),
      ],
    }),

    // TODO move to TaskServise?
    getTasksByBoardAndColumnIds: build.query<ITask[], { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => ({ url: `/boards/${boardId}/columns/${columnId}/tasks` }),
      providesTags: (result) => [
        'Task',
        ...(result ? result.map(({ _id }) => ({ type: 'Task' as const, _id: _id })) : []),
      ],
    }),
  }),
});
