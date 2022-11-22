import React, { FC, useState } from 'react';

import styles from './EditableBoardTitle.module.scss';
import Heading from 'components/atoms/Heading';

interface EditableBoardTitleProps {
  level: 1 | 2 | 3 | 4;
  text: string;
  boardId: string;
}

const EditableBoardTitle: FC<EditableBoardTitleProps> = ({ level, text, boardId }) => {
  const [edit, setEdit] = useState(false);

  const handleEdit = () => {};
  const handleSubmit = () => {};
  const handleCancel = () => {};

  return (
    <div className={styles.container}>
      <Heading className={styles.heading} level={level} text={text} />
    </div>
  );
};

export default EditableBoardTitle;
