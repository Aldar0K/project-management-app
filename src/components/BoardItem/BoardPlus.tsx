import Icon from 'components/atoms/Icon';
import React from 'react';
import styles from './BoardItem.module.scss';

const BoardPlus = ({ setModal }: { setModal: (bool: boolean) => void }) => {
  return (
    <div onClick={() => setModal(true)} className={`${styles.board} ${styles.plus}`}>
      <Icon type="add-cross" width="80" height="80"></Icon>
    </div>
  );
};

export default BoardPlus;
