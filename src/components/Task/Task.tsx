import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

import styles from './Task.module.scss';
import { AuthorizationAPI, BoardAPI } from 'store';
import { ITask } from 'models';

import Icon from 'components/atoms/Icon';
import Heading from 'components/atoms/Heading';
import ErrorModal from 'components/atoms/errorModal';
import EditTaskModal from 'components/EditTaskModal';
import ConfirmationModal from 'components/atoms/ConfirmationModal';

interface TaskProps {
  task: ITask;
  index: number;
}

const Task: React.FC<TaskProps> = ({
  task,
  task: { _id: taskId, boardId, columnId, title, users: userIds },
  index,
}) => {
  const { t } = useTranslation();

  const { data: allUsers } = AuthorizationAPI.useGetAllUsersQuery();
  const [userNames, setUserNames] = useState<string[]>([]);

  useEffect(() => {
    if (userIds && allUsers) {
      const users = allUsers.filter((user) => userIds.includes(user._id as string));
      const userNames = users.map((user) => user.name as string);

      setUserNames(userNames);
    }
  }, [allUsers, userIds]);

  const [deleteTaskByBoardIdAndColumnIdAndTaskId, { isLoading, error }] =
    BoardAPI.useDeleteTaskByBoardIdAndColumnIdAndTaskIdMutation();

  const [isErrorModalActive, setErrorModalActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (error && 'data' in error) {
      setErrorMessage(error.data.message);
      setErrorModalActive(true);
    } else {
      setErrorModalActive(false);
    }
  }, [error]);

  const [isEditTaskModalActive, setIsEditTaskModalActive] = useState(false);
  const [isConfirmationModalActive, setConfirmationModalActive] = useState(false);

  const confirmDelete = () => {
    deleteTaskByBoardIdAndColumnIdAndTaskId({ boardId, columnId, taskId });
  };

  return (
    <>
      <Draggable key={taskId} draggableId={taskId} index={index}>
        {(
          draggableTaskProvided: DraggableProvided,
          draggableTaskSnapshot: DraggableStateSnapshot
        ) => (
          <li
            className={
              draggableTaskSnapshot.isDragging
                ? `${styles.container} ${styles.container_dragging}`
                : styles.container
            }
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
            {userNames.length > 0 && (
              <ul className={styles.responsible}>
                {userNames.map((userName) => (
                  <li className={styles.responsible_user} key={userName}>
                    {userName}
                  </li>
                ))}
              </ul>
            )}
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
