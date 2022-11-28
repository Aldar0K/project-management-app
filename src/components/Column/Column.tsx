import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Draggable } from 'react-beautiful-dnd';

import styles from './Column.module.scss';
import { IColumn } from 'models';
import { BoardAPI } from 'store';

import Task from 'components/Task';
import Icon from 'components/atoms/Icon';
import Modal from 'components/atoms/Modal';
import Button from 'components/atoms/Button';
import ErrorModal from 'components/atoms/errorModal';
import CreateTaskForm from 'components/CreateTaskForm';
import EditableColumnTitle from 'components/EditableColumnTitle';
import ConfirmationModal from 'components/atoms/ConfirmationModal';

interface ColumnProps {
  column: IColumn;
  index: number;
}

const Column: React.FC<ColumnProps> = ({
  column: { _id: columnId, title, order, boardId },
  index,
}) => {
  const { t } = useTranslation();

  const [deleteColumnByBoardIdAndColumnId, { isLoading, error }] =
    BoardAPI.useDeleteColumnByBoardIdAndColumnIdMutation();

  const { data: tasks } = BoardAPI.useGetTasksByBoardIdAndColumnIdQuery({ boardId, columnId });

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
    <>
      <Draggable draggableId={columnId} index={index}>
        {(provided) => (
          <li
            className={styles.container}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
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
                text={t('Board.addTask')}
                big={false}
                iconType="add-cross"
                iconWidth="12"
                onClick={() => setCreateModalActive(true)}
              />
              <button
                className={styles.delete}
                onClick={() => setConfirmationModalActive(true)}
                title={t('Common.delete') as string}
              >
                <Icon type="delete" width="26" />
              </button>
            </div>
          </li>
        )}
      </Draggable>

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
          text={t('Board.confirmDeleteColumn')}
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

export default Column;
