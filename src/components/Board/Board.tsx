import React, { useState } from 'react';

import styles from './Board.module.scss';
import { IBoard } from 'models';
import { BoardAPI } from 'store';
import Button from 'components/atoms/Button';
import Column from 'components/Column';
import EditableBoardTitle from 'components/EditableBoardTitle';
import Modal from 'components/atoms/Modal';
import CreateColumnForm from 'components/CreateColumnForm';

interface BoardProps {
  board: IBoard;
}

const Board: React.FC<BoardProps> = ({ board: { _id: boardId, title, owner, users } }) => {
  const { data: columns } = BoardAPI.useGetColumnsByBoardIdQuery(boardId);
  const [isCreateModalActive, setCreateModalActive] = useState(false);

  return (
    <div className={styles.container}>
      <EditableBoardTitle level={2} text={title} boardId={boardId} owner={owner} users={users} />
      <div className={styles.columnsContainer}>
        <ul className={styles.columns}>
          {/* Add filter method to filter columns by order? */}
          {columns && columns.map((column) => <Column column={column} key={column._id} />)}
          <Button
            type="transparent-dark"
            text="Add new column"
            big={false}
            iconType="add-cross"
            iconWidth="12"
            onClick={() => setCreateModalActive(true)}
          />
        </ul>
      </div>

      {isCreateModalActive && (
        <Modal onClose={() => setCreateModalActive(false)}>
          <CreateColumnForm
            boardId={boardId}
            columnsLength={columns ? columns.length : 0}
            onCancel={() => setCreateModalActive(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Board;
