import React from 'react';

import styles from './Board.module.scss';
import { IBoard } from 'models';
import { BoardAPI } from 'store';
import Column from 'components/Column';
import EditableBoardTitle from 'components/EditableBoardTitle';

interface BoardProps {
  board: IBoard;
}

const Board: React.FC<BoardProps> = ({ board: { _id: boardId, title, owner, users } }) => {
  const { data: columns } = BoardAPI.useGetColumnsByBoardIdQuery(boardId);

  return (
    <>
      <div className={styles.container}>
        <EditableBoardTitle level={2} text={title} boardId={boardId} owner={owner} users={users} />
        <div className={styles.columnsContainer}>
          <ul className={styles.columns}>
            {/* Add filter method to filter columns by order? */}
            {columns && columns.map((column) => <Column column={column} key={column._id} />)}
            {/* Add create new column button */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Board;
