import React, { useEffect, useState } from 'react';

import styles from './Column.module.scss';
import { IColumn } from 'models';
import { BoardAPI } from 'store';
import Button from 'components/atoms/Button';
import Icon from 'components/atoms/Icon';
import ErrorModal from 'components/atoms/errorModal';
import ConfirmationModal from 'components/atoms/ConfirmationModal';
import Modal from 'components/atoms/Modal';
import Task from 'components/Task';
import CreateTaskForm from 'components/CreateTaskForm';
import EditableColumnTitle from 'components/EditableColumnTitle';

interface ColumnProps {
  column: IColumn;
}

const Column: React.FC<ColumnProps> = ({ column: { _id: columnId, title, order, boardId } }) => {
  const { data: tasks } = BoardAPI.useGetTasksByBoardIdAndColumnIdQuery({ boardId, columnId });
  const [deleteColumnByBoardIdAndColumnId, { isLoading, error }] =
    BoardAPI.useDeleteColumnByBoardIdAndColumnIdMutation();

  const [isErrorModalActive, setErrorModalActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isConfirmationModalActive, setConfirmationModalActive] = useState(false);
  const [isCreateModalActive, setCreateModalActive] = useState(false);

  useEffect(() => {
    if (error && 'data' in error) {
      setErrorMessage(error.data.message);
      setErrorModalActive(true);
    } else {
      setErrorModalActive(false);
    }
  }, [error]);

  const confirmDelete = () => {
    deleteColumnByBoardIdAndColumnId({ boardId, columnId });
  };

  return (
    <div className={styles.container}>
      <EditableColumnTitle
        level={3}
        text={title}
        boardId={boardId}
        columnId={columnId}
        order={order}
      />
      <div className={styles.tasksContainer}>
        <ul className={styles.tasks}>
          {tasks && tasks.map((task) => <Task task={task} key={task._id} />)}
        </ul>
      </div>
      <div className={styles.controls}>
        <Button
          type="transparent-dark"
          text="Add new task"
          big={false}
          iconType="add-cross"
          iconWidth="12"
          onClick={() => setCreateModalActive(true)}
        />
        <button className={styles.delete} onClick={() => setConfirmationModalActive(true)}>
          <Icon type="delete" width="26" />
        </button>
      </div>

      {isCreateModalActive && (
        <Modal onClose={() => setCreateModalActive(false)}>
          <CreateTaskForm
            boardId={boardId}
            columnId={columnId}
            tasksLength={tasks ? tasks.length : 0}
            onCancel={() => setCreateModalActive(false)}
          />
        </Modal>
      )}

      {isConfirmationModalActive && (
        <ConfirmationModal
          text="Delete column?"
          confirmButtonText="Delete"
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
    </div>
  );
};

export default Column;
