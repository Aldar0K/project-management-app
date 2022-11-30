import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';

import styles from './Task.module.scss';
import { ITask } from 'models';
import { BoardAPI } from 'store';

import Icon from 'components/atoms/Icon';
import Heading from 'components/atoms/Heading';
import ErrorModal from 'components/atoms/errorModal';
import EditTaskModal from 'components/EditTaskModal';
import ConfirmationModal from 'components/atoms/ConfirmationModal';

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({
  task,
  task: { _id: taskId, boardId, columnId, title, order },
}) => {
  const { t } = useTranslation();

  const [deleteTaskByBoardIdAndColumnIdAndTaskId, { isLoading, error }] =
    BoardAPI.useDeleteTaskByBoardIdAndColumnIdAndTaskIdMutation();

  const [isErrorModalActive, setErrorModalActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isEditTaskModalActive, setIsEditTaskModalActive] = useState(false);
  const [isConfirmationModalActive, setConfirmationModalActive] = useState(false);

  useEffect(() => {
    if (error && 'data' in error) {
      setErrorMessage(error.data.message);
      setErrorModalActive(true);
    } else {
      setErrorModalActive(false);
    }
  }, [error]);

  const confirmDelete = () => {
    deleteTaskByBoardIdAndColumnIdAndTaskId({ boardId, columnId, taskId });
  };

  return (
    <>
      <Draggable key={taskId} draggableId={taskId} index={order}>
        {(draggableTaskProvided: DraggableProvided) => (
          <li
            className={styles.container}
            {...draggableTaskProvided.draggableProps}
            {...draggableTaskProvided.dragHandleProps}
            ref={draggableTaskProvided.innerRef}
          >
            <Heading className={styles.heading} level={4} text={title} />
            <div className={styles.controls}>
              <button
                className={styles.edit}
                title={t('Common.edit') as string}
                onClick={() => setIsEditTaskModalActive(true)}
              >
                <Icon type="edit" width="22" />
              </button>
              <button
                className={styles.delete}
                title={t('Common.delete') as string}
                onClick={() => setConfirmationModalActive(true)}
              >
                <Icon type="delete" width="22" />
              </button>
            </div>
          </li>
        )}
      </Draggable>

      {isEditTaskModalActive && (
        <EditTaskModal task={task} onCancel={() => setIsEditTaskModalActive(false)} />
      )}

      {isConfirmationModalActive && (
        <ConfirmationModal
          text={t('Board.confirmDeleteTask')}
          confirmButtonText={t('Common.delete')}
          onConfirm={confirmDelete}
          onClose={() => setConfirmationModalActive(false)}
          loading={isLoading}
        />
      )}

      {isErrorModalActive && (
        <ErrorModal onClose={() => setErrorModalActive(false)}>
          <h3>{errorMessage}</h3>
        </ErrorModal>
      )}
    </>
  );
};

export default Task;
