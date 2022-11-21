import React from 'react';

import styles from './Board.module.scss';
import { IBoard } from 'models';
import { BoardAPI } from 'store';
import Heading from 'components/atoms/Heading';
import Column from 'components/Column';

interface BoardProps {
  board: IBoard;
}

const Board: React.FC<BoardProps> = ({ board: { _id: boardId, title, owner, users } }) => {
  const { data: columns } = BoardAPI.useGetColumnsByBoardIdQuery(boardId);

  return (
    <>
      <div className={styles.container}>
        <Heading className={styles.heading} level={2} text={title} />
        <ul className={styles.columns}>
          {/* Add filter method to filter columns by order? */}
          {columns && columns.map((column) => <Column column={column} key={column._id} />)}
          {/* Add create new column button */}
        </ul>
      </div>
    </>
  );
};

export default Board;
