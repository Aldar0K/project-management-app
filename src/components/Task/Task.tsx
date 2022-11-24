import React from 'react';

import styles from './Task.module.scss';
import { ITask } from 'models';
import Heading from 'components/atoms/Heading';
import Icon from 'components/atoms/Icon';

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <li className={styles.container}>
      <Heading className={styles.heading} level={4} text={task.title} />
      <div className={styles.icon}>
        <Icon type="edit" width="22" />
      </div>
    </li>
  );
};

export default Task;
