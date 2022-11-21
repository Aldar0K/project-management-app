import React from 'react';

import styles from './Column.module.scss';
import { IColumn } from 'models';
import Heading from 'components/atoms/Heading';

interface ColumnProps {
  column: IColumn;
}

const Column: React.FC<ColumnProps> = ({ column: { _id: columnId, title, order, boardId } }) => {
  return (
    <>
      <div className={styles.container}>
        <Heading className={styles.heading} level={3} text={title} />
        <ul className={styles.tasks}>
          {/* {tasks && tasks.map(task => (<Task task={task} key={task._id} />))} */}
          {/* Add create new task button */}
        </ul>
      </div>
    </>
  );
};

export default Column;
