import React from 'react';
import styles from './BoardItem.module.scss';
import { Link } from 'react-router-dom';
import getImgPath from 'utils/randomImg';
import Icon from 'components/atoms/Icon';

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
          <h3 className={styles.title}>{board.title}</h3>
          <div className={styles.controls}>
            <div className={styles.scale}>
              <Icon type="edit" width="23"></Icon>
            </div>
            <div className={styles.scale}>
              <Icon type="delete" width="23"></Icon>
            </div>
          </div>
        </div>
        <div className={styles.descr}>{board.description}</div>
      </div>
    </Link>
  );
};

export default BoardInstance;
