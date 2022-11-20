import React, { useEffect, useState } from 'react';

import styles from './Board.module.scss';
import { IBoard } from 'models';
import Heading from 'components/atoms/Heading';

interface BoardProps {
  board: IBoard;
}

const Board: React.FC<BoardProps> = ({ board: { _id, title, owner, users } }) => {
  return (
    <>
      <div className={styles.container}>
        <Heading level={2} text={`Board page. ID: ${title}`} />
      </div>
    </>
  );
};

export default Board;
