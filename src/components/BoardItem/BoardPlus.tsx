import Button from 'components/atoms/Button';
import React from 'react';
import styles from './BoardItem.module.scss';

const BoardPlus = () => {
  return (
    <div className={`${styles.board} ${styles.plus}`}>
      <Button
        text=""
        type="transparent-dark"
        big={true}
        iconType={'add-cross'}
        iconWidth="80"
        onClick={() => {}}
      />
    </div>
  );
};

export default BoardPlus;
