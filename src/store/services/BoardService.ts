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
              ...result.map(({ _id }) => ({ type: 'BoardList' as const, _id })),
              // { type: 'Board', id: 'LIST' },
            ]
          : // : [{ type: 'Board', id: 'LIST' }],
            ['BoardList'],
    }),
    getBoardById: build.query<IBoard, string>({
      query: (boardId) => ({ url: `boards/${boardId}` }),
      providesTags: (result, error, arg) => [{ type: 'Board', id: arg }],
    }),
    getBoardsByUserId: build.query<IBoard[], string>({
      query: (userId) => ({ url: `boardsSet/${userId}` }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Board' as const, _id })),
              { type: 'Board', id: 'LIST' },
            ]
          : // : [{ type: 'Board', id: 'LIST' }],
            ['Board'],
    }),
    createBoard: build.mutation<IBoard, IBoardData>({
      query: (body) => ({
        url: `/boards`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['BoardList'],
    }),
    updateBoardById: build.mutation<IBoard, IBoardParams>({
      query: ({ id, body }) => ({
        url: `/boards/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Board' as const, id: arg.id }],
    }),
    deleteBoardById: build.mutation<IBoard[], string>({
      query: (boardId) => ({ url: `boards/${boardId}`, method: 'DELETE' }),
      invalidatesTags: (result, error, arg) => [{ type: 'Board' as const, _id: arg }],
    }),

    getColumnsByBoardId: build.query<IColumn[], string>({
      query: (boardId) => ({ url: `/boards/${boardId}/columns` }),
      transformResponse: async (response: Promise<Array<IColumn>>) => {
        return (await response).sort(
          (column1: IColumn, column2: IColumn) => column1.order - column2.order
        );
      },
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
    updateColumnsSet: build.mutation<
      IColumn[],
      { boardId: string; body: { _id: string; order: number }[] }
    >({
      query: ({ body }) => ({ url: `/columnsSet`, method: 'PATCH', body }),
      async onQueryStarted({ boardId, body: columnsSet }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          BoardAPI.util.updateQueryData('getColumnsByBoardId', boardId, (drafts: IColumn[]) => {
            columnsSet.forEach((columnPatch) => {
              const draft = drafts.find((column) => column._id === columnPatch._id);
              if (draft) {
                draft.order = columnPatch.order;
              }
            });
            drafts.sort((column1, column2) => column1.order - column2.order);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ['Column'],
    }),

    getTasksByBoardIdAndColumnId: build.query<ITask[], { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => ({ url: `/boards/${boardId}/columns/${columnId}/tasks` }),
      transformResponse: async (response: Promise<Array<ITask>>) => {
        return (await response).sort((task1: ITask, task2: ITask) => task1.order - task2.order);
      },
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
      // invalidatesTags: (result, error, arg) => [{ type: 'Task' as const, _id: arg.taskId }],
      invalidatesTags: ['Task'],
    }),
    updateTasksSet: build.mutation<
      ITask[],
      {
        boardId: string;
        columnId: string;
        body: { _id: string; order: number; columnId: string }[];
        newTasks: ITask[];
      }
    >({
      query: ({ body }) => ({ url: `/tasksSet`, method: 'PATCH', body }),
      async onQueryStarted({ boardId, columnId, newTasks }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          BoardAPI.util.updateQueryData(
            'getTasksByBoardIdAndColumnId',
            { boardId, columnId },
            () => newTasks
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ['Task'],
    }),
  }),
});
