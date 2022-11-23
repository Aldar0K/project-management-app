import React, { useEffect, useState } from 'react';

import styles from './Column.module.scss';
import { IColumn } from 'models';
import { BoardAPI } from 'store';
import Heading from 'components/atoms/Heading';
import Button from 'components/atoms/Button';
import Icon from 'components/atoms/Icon';
import Task from 'components/Task';
import ErrorModal from 'components/atoms/errorModal';

interface ColumnProps {
  column: IColumn;
}

const Column: React.FC<ColumnProps> = ({ column: { _id: columnId, title, order, boardId } }) => {
  const { data: tasks } = BoardAPI.useGetTasksByBoardIdAndColumnIdQuery({ boardId, columnId });
  const [deleteColumnByBoardIdAndColumnId, { error }] =
    BoardAPI.useDeleteColumnByBoardIdAndColumnIdMutation();
  const [isModalActive, setModalActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (error && 'data' in error) {
      setErrorMessage(error.data.message);
      setModalActive(true);
    } else {
      setModalActive(false);
    }
  }, [error]);

  const handleDelete = () => {};

  const confirmDelete = () => {
    deleteColumnByBoardIdAndColumnId({ boardId, columnId });
  };

  return (
    <>
      <div className={styles.container}>
        <Heading className={styles.heading} level={3} text={title} />
        <ul className={styles.tasks}>
          {tasks && tasks.map((task) => <Task task={task} key={task._id} />)}
          {/* Add create new task button */}
          <div className={styles.controls}>
            <Button
              type="transparent-dark"
              text="Add new task"
              big={false}
              iconType="add-cross"
              iconWidth="12"
              onClick={() => {}}
            />
            {/* <Button type="transparent-dark" text="Delete" big={false} onClick={() => {}} /> */}
            <button className={styles.delete} onClick={handleDelete}>
              <Icon type="delete" width="26" />
            </button>
          </div>
        </ul>
        {isModalActive && (
          <ErrorModal onClose={() => setModalActive(false)}>
            <h3>{errorMessage}</h3>
          </ErrorModal>
        )}
      </div>
    </>
  );
};

export default Column;
