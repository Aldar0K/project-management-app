import React, { useEffect, useState } from 'react';

import styles from './Task.module.scss';
import { ITask } from 'models';
import Heading from 'components/atoms/Heading';
import Icon from 'components/atoms/Icon';
import ConfirmationModal from 'components/atoms/ConfirmationModal';
import { BoardAPI } from 'store';
import ErrorModal from 'components/atoms/errorModal';

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({
  task: { _id: taskId, boardId, columnId, description, order, title, userId, users },
}) => {
  const [deleteTaskByBoardIdAndColumnIdAndTaskId, { error }] =
    BoardAPI.useDeleteTaskByBoardIdAndColumnIdAndTaskIdMutation();

  const [isErrorModalActive, setErrorModalActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
    <li className={styles.container}>
      <Heading className={styles.heading} level={4} text={title} />
      <div className={styles.controls}>
        <button className={styles.edit}>
          <Icon type="edit" width="22" />
        </button>
        <button className={styles.delete} onClick={() => setConfirmationModalActive(true)}>
          <Icon type="delete" width="22" />
        </button>
      </div>

      {isConfirmationModalActive && (
        <ConfirmationModal
          text="Delete task?"
          confirmButtonText="Delete"
          onConfirm={confirmDelete}
          onClose={() => setConfirmationModalActive(false)}
        />
      )}

      {isErrorModalActive && (
        <ErrorModal onClose={() => setErrorModalActive(false)}>
          <h3>{errorMessage}</h3>
        </ErrorModal>
      )}
    </li>
  );
};

export default Task;
