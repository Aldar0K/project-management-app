import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Board.module.scss';
import { IBoard, IError } from 'models';
import { BoardAPI } from 'store';

import Button from 'components/atoms/Button';
import Column from 'components/Column';
import EditableBoardTitle from 'components/EditableBoardTitle';
import Modal from 'components/atoms/Modal';
import CreateColumnForm from 'components/CreateColumnForm';
import Heading from 'components/atoms/Heading';

interface BoardProps {
  board: IBoard;
}

const Board: React.FC<BoardProps> = ({ board: { _id: boardId, title, owner, users } }) => {
  const { data: columns, error, isLoading } = BoardAPI.useGetColumnsByBoardIdQuery(boardId);
  const [isCreateModalActive, setCreateModalActive] = useState(false);
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <EditableBoardTitle level={2} text={title} boardId={boardId} owner={owner} users={users} />
      <div className={styles.columnsContainer}>
        <ul className={styles.columns}>
          {/* Add filter method to filter columns by order? */}
          {columns && columns.map((column) => <Column column={column} key={column._id} />)}
          <li className={styles.createButton}>
            <Button
              type="transparent-dark"
              text={t('Board.addColumn')}
              big={false}
              iconType="add-cross"
              iconWidth="12"
              onClick={() => setCreateModalActive(true)}
            />
          </li>
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

      {isLoading && <Heading level={2} text={t('Common.loading')} />}

      {error && (
        <Heading
          level={2}
          text={`${t('Common.serverError')} (${(error as IError).data.message})`}
        />
      )}
    </div>
  );
};

export default Board;
