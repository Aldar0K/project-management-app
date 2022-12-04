import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DragDropContext, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd';

import styles from './Board.module.scss';
import { IBoard, ITask } from 'models';
import { BoardAPI, useAppSelector } from 'store';

import Button from 'components/atoms/Button';
import Column from 'components/Column';
import EditableBoardTitle from 'components/EditableBoardTitle';
import Modal from 'components/atoms/Modal';
import CreateColumnForm from 'components/CreateColumnForm';
import Heading from 'components/atoms/Heading';
import ErrorModal from 'components/atoms/errorModal';

interface BoardProps {
  board: IBoard;
}

const Board: React.FC<BoardProps> = ({ board: { _id: boardId, title, owner, users } }) => {
  const { t } = useTranslation();
  const state = useAppSelector((state) => state);

  const [isCreateModalActive, setCreateModalActive] = useState(false);

  const {
    data: columns,
    error: getColumnsError,
    isLoading: getColumnsIsLoading,
  } = BoardAPI.useGetColumnsByBoardIdQuery(boardId);

  const [updateColumnsSet, { error: updateColumnsError }] = BoardAPI.useUpdateColumnsSetMutation();
  const [updateTasksSet, { error: updateTasksError }] = BoardAPI.useUpdateTasksSetMutation();

  const [isErrorModalActive, setErrorModalActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (getColumnsError && 'data' in getColumnsError) {
      setErrorMessage(getColumnsError.data.message);
      setErrorModalActive(true);
    } else {
      setErrorModalActive(false);
    }

    if (updateColumnsError && 'data' in updateColumnsError) {
      setErrorMessage(updateColumnsError.data.message);
      setErrorModalActive(true);
    } else {
      setErrorModalActive(false);
    }

    if (updateTasksError && 'data' in updateTasksError) {
      setErrorMessage(updateTasksError.data.message);
      setErrorModalActive(true);
    } else {
      setErrorModalActive(false);
    }
  }, [getColumnsError, updateColumnsError, updateTasksError]);

  const handleDragEnd = (result: DropResult) => {
    const { type, source, destination, draggableId } = result;

    if (
      !destination ||
      !columns ||
      (destination.index === source.index && destination.droppableId === source.droppableId)
    ) {
      return;
    }

    if (type === 'COLUMN') {
      const newColumns = [...columns];
      const [reorderedColumn] = newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, reorderedColumn);

      const newColummnsSet = newColumns.map((column, index) => {
        return {
          _id: column._id,
          order: index,
        };
      });
      updateColumnsSet({ boardId, body: newColummnsSet });
    }

    if (type === 'TASK') {
      // Getting all tasks from a hash.
      const allTasks: ITask[] = [];
      const columnIds: string[] = columns.map((item) => item._id);
      columnIds.forEach((columnId) => {
        const result = BoardAPI.endpoints.getTasksByBoardIdAndColumnId.select({
          boardId,
          columnId,
        })(state);
        if (result.isSuccess) {
          result.data.forEach((data) => allTasks.push(data));
        }
      });

      if (source.droppableId === destination.droppableId) {
        // If we change the data for one column.
        const newTasks = allTasks
          .filter((task) => task.columnId === source.droppableId)
          .sort((task1, task2) => task1.order - task2.order);

        const [reorderedTask] = newTasks.splice(source.index, 1);
        newTasks.splice(destination.index, 0, reorderedTask);

        const newTasksSet = newTasks.map((task, index) => {
          return {
            _id: task._id,
            order: index,
            columnId: source.droppableId,
          };
        });

        updateTasksSet({
          boardId,
          columnId: source.droppableId,
          body: newTasksSet,
          newTasks,
        });
      } else {
        // If we change the data for two columns.
        // Updating target column.
        const targetColumnTasks = allTasks
          .filter((task) => task.columnId === destination.droppableId)
          .sort((task1, task2) => task1.order - task2.order);

        const [draggableTask] = allTasks.filter((task) => task._id === draggableId);

        if (destination.index === targetColumnTasks.length) {
          // If we add a task to the end of the column.
          targetColumnTasks.push(draggableTask);
        } else {
          // If we don't add a task to the end of the column.
          const [reorderedTask] = targetColumnTasks.splice(destination.index, 1);
          targetColumnTasks.splice(destination.index, 0, draggableTask);
          targetColumnTasks.splice(destination.index + 1, 0, reorderedTask);
        }

        const newTasksSet = targetColumnTasks.map((task, index) => {
          return {
            _id: task._id,
            order: index,
            columnId: destination.droppableId,
          };
        });

        updateTasksSet({
          boardId,
          columnId: destination.droppableId,
          body: newTasksSet,
          newTasks: targetColumnTasks,
        });

        // Updating source column.
        const sourceColumnTasks = allTasks
          .filter((task) => task.columnId === source.droppableId)
          .filter((task) => task._id !== draggableId)
          .sort((task1, task2) => task1.order - task2.order);

        const oldTasksSet = sourceColumnTasks.map((task, index) => {
          return {
            _id: task._id,
            order: index,
            columnId: source.droppableId,
          };
        });

        updateTasksSet({
          boardId,
          columnId: source.droppableId,
          body: oldTasksSet,
          newTasks: sourceColumnTasks,
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      <EditableBoardTitle level={2} text={title} boardId={boardId} owner={owner} users={users} />
      <div className={styles.columnsContainer}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="columns" type="COLUMN" direction="horizontal">
            {(droppableColumnProvided: DroppableProvided) => (
              <ul
                className={styles.columns}
                {...droppableColumnProvided.droppableProps}
                ref={droppableColumnProvided.innerRef}
              >
                {columns &&
                  columns.map((column, index) => (
                    <Column column={column} key={column._id} index={index} />
                  ))}
                {droppableColumnProvided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        <div className={styles.createButton}>
          <Button
            type="transparent-dark"
            text={t('Board.addColumn')}
            big={false}
            iconType="add-cross"
            iconWidth="12"
            onClick={() => setCreateModalActive(true)}
          />
        </div>
      </div>

      {isCreateModalActive && (
        <Modal onClose={() => setCreateModalActive(false)}>
          <CreateColumnForm
            boardId={boardId}
            columnsLength={columns ? columns.length : 0}
            onCancel={() => setCreateModalActive(false)}
          />
        </Modal>
      )}

      {getColumnsIsLoading && <Heading level={2} text={t('Common.loading')} />}

      {isErrorModalActive && (
        <ErrorModal onClose={() => setErrorModalActive(false)}>
          <h3>{errorMessage}</h3>
        </ErrorModal>
      )}
    </div>
  );
};

export default Board;
