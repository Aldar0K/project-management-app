import { IBoard, IBoardData, IBoardParams, IColumn, ITask } from 'models';
import { commonApi } from './common.api';

export const BoardAPI = commonApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBoards: build.query<IBoard[], void>({
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

    // TODO move to ColumnServise.
    getColumnsByBoardId: build.query<IColumn[], string>({
      query: (boardId) => ({ url: `/boards/${boardId}/columns` }),
      providesTags: (result) => [
        'BoardColumns',
        ...(result ? result.map(({ _id }) => ({ type: 'BoardColumns' as const, _id: _id })) : []),
      ],
    }),

    // TODO move to TaskServise.
    // getTasksByBoardId: build.query<ITask[], string>({
    //   query: (boardId, columnId) => ({ url: `/boards/${boardId}/columns/${columnId}/tasks` }),
    //   providesTags: (result) => [
    //     'ColumnTasks',
    //     ...(result ? result.map(({ _id }) => ({ type: 'ColumnTasks' as const, _id: _id })) : []),
    //   ],
    // }),
  }),
});
