import {
  IBoard,
  IBoardData,
  IBoardParams,
  IColumn,
  IColumnParams,
  ITask,
  ITaskParams,
} from 'models';
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
    createColumnByBoardId: build.mutation<
      IColumn,
      {
        boardId: string;
        body: {
          title: 'string';
          order: number;
        };
      }
    >({
      query: ({ boardId, body }) => ({
        url: `/boards/${boardId}/columns`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Column'],
    }),
    updateColumnByBoardIdAndColumnId: build.mutation<IColumn, IColumnParams>({
      query: ({ boardId, columnId, body }) => ({
        url: `/boards/${boardId}/columns/${columnId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Column' as const, _id: arg.columnId }],
    }),
    deleteColumnByBoardIdAndColumnId: build.mutation<
      IColumn,
      { boardId: string; columnId: string }
    >({
      query: ({ boardId, columnId }) => ({
        url: `/boards/${boardId}/columns/${columnId}`,
        method: 'DELETE',
      }),
      // invalidatesTags: (result, error, arg) => [{ type: 'Column' as const, _id: arg }],
      invalidatesTags: (result, error, arg) => [{ type: 'Column' as const, _id: arg.columnId }],
    }),

    updateColumnsSet: build.mutation<IColumn[], { _id: string; order: number }[]>({
      query: (body) => ({ url: `/columnsSet`, method: 'PATCH', body }),
      invalidatesTags: ['Column'],
    }),

    // TODO move to TaskServise?
    getTasksByBoardIdAndColumnId: build.query<ITask[], { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => ({ url: `/boards/${boardId}/columns/${columnId}/tasks` }),
      providesTags: (result) => [
        'Task',
        ...(result ? result.map(({ _id }) => ({ type: 'Task' as const, _id: _id })) : []),
      ],
    }),
    createTaskByBoardIdAndColumnId: build.mutation<ITask, ITaskParams>({
      query: ({ boardId, columnId, body }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Task'],
    }),
    updateTaskByBoardIdAndColumnIdAndTaskId: build.mutation<
      ITask,
      {
        boardId: string;
        columnId: string;
        taskId: string;
        body: {
          title: string;
          order: number;
          description: string;
          columnId: string;
          userId: string;
          users: string[];
        };
      }
    >({
      query: ({ boardId, columnId, taskId, body }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Task'],
      // invalidatesTags: (result, error, arg) => [{ type: 'Task' as const, _id: arg.columnId }],
    }),
    deleteTaskByBoardIdAndColumnIdAndTaskId: build.mutation<
      ITask,
      { boardId: string; columnId: string; taskId: string }
    >({
      query: ({ boardId, columnId, taskId }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Task' as const, _id: arg.taskId }],
    }),
  }),
});
