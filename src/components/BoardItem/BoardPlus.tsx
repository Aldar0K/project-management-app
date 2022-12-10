import Icon from 'components/atoms/Icon';
import Modal from 'components/atoms/Modal';
import CreateBoardForm from 'components/CreateBoardForm';
import React, { useState } from 'react';
import styles from './BoardItem.module.scss';

const BoardPlus = () => {
  const [isCreateModalActive, setCreateModalActive] = useState(false);

  const handleAddBoard = () => {
    setCreateModalActive(true);
  };

  return (
    <>
      <div className={`${styles.board} ${styles.plus}`} onClick={handleAddBoard}>
        <Icon type="add-cross" width="80" height="80"></Icon>
      </div>

      {isCreateModalActive && (
        <Modal onClose={() => setCreateModalActive(false)}>
          <CreateBoardForm onCancel={() => setCreateModalActive(false)} />
        </Modal>
      )}
    </>
  );
};

export default BoardPlus;
