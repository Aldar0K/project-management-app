import React from 'react';
import styles from './BoardItem.module.scss';
import { Link } from 'react-router-dom';
import getImgPath from 'utils/randomImg';
import Icon from 'components/atoms/Icon';
import Heading from 'components/atoms/Heading';

interface IBoardInstanceProps {
  board: {
    _id: string;
    title: string;
    description: string;
  };
  setModal: (bool: boolean) => void;
}

const BoardInstance = ({ board }: IBoardInstanceProps) => {
  return (
    <Link to={`/boards/${board._id}`} className={`${styles.board} ${styles.instance}`}>
      <div className={styles.img}>
        <img className={styles.imgInstance} src={getImgPath()} alt="bg-img" />
      </div>
      <div className={styles.info}>
        <div className={styles.topInfo}>
          <Heading level={3} text={board.title} className={styles.title} />
          <div className={styles.controls}>
            <button
              className={styles.delete}
              onClick={(e) => {
                e.preventDefault();
              }}
              title="delete"
            >
              <Icon type="delete" width="26" />
            </button>
          </div>
        </div>
        <div className={styles.descr}>{board.description}</div>
      </div>
    </Link>
  );
};

export default BoardInstance;
