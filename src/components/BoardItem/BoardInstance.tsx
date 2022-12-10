import React, { FC, useEffect, useState } from 'react';
import styles from './BoardItem.module.scss';
import { useNavigate } from 'react-router-dom';
import getImgPath from 'utils/randomImg';
import Icon from 'components/atoms/Icon';
import Heading from 'components/atoms/Heading';
import { useTranslation } from 'react-i18next';
import { BoardAPI } from 'store';
import ConfirmationModal from 'components/atoms/ConfirmationModal';
import ErrorModal from 'components/atoms/errorModal';

interface IBoardInstanceProps {
  board: {
    _id: string;
    title: string;
  };
}

const BoardInstance: FC<IBoardInstanceProps> = ({ board }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isConfirmationModalActive, setConfirmationModalActive] = useState(false);
  const [deleteBoardById, { isLoading, error }] = BoardAPI.useDeleteBoardByIdMutation();

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

  const confirmDelete = () => {
    deleteBoardById(board._id);
  };

  const goToBoard = () => {
    navigate(`/boards/${board._id}`);
  };

  return (
    <>
      <div className={`${styles.board} ${styles.instance}`}>
        <div className={styles.img}>
          <img className={styles.imgInstance} src={getImgPath()} alt="bg-img" />
        </div>
        <div className={styles.info}>
          <div className={styles.topInfo}>
            <Heading level={3} text={board.title} className={styles.title} />
            <div className={styles.controls}>
              <button onClick={goToBoard} className={styles.button}>
                <Heading level={3} text="Go to board" />
              </button>
              <button
                className={styles.delete}
                onClick={() => setConfirmationModalActive(true)}
                title={t('Common.delete') as string}
              >
                <Icon type="delete" width="26" />
              </button>
            </div>
          </div>
          {/* <div className={styles.descr}>{board.description}</div> */}
        </div>
      </div>

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

export default BoardInstance;
