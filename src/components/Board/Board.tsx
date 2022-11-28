import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import styles from './Board.module.scss';
import { IBoard, IColumn, IError } from 'models';
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
  const { t } = useTranslation();

  const [isCreateModalActive, setCreateModalActive] = useState(false);

  const { data: rawColumns, error, isLoading } = BoardAPI.useGetColumnsByBoardIdQuery(boardId);
  const [columns, setColumns] = useState<IColumn[]>([]);

  // TODO add a loading animation and an error handler for column order update errors.
  const [updateColumnSet, { isLoading: isUpdateLoading, error: updateError }] =
    BoardAPI.useUpdateColumnsSetMutation();

  useEffect(() => {
    if (rawColumns) {
      const sortedByOrderColumns = [...rawColumns].sort(
        (column1, column2) => column1.order - column2.order
      );
      setColumns(sortedByOrderColumns);
    }
  }, [rawColumns]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || result.destination.index === result.source.index) {
      return;
    }

    const newColumns = [...columns];
    const [removed] = newColumns.splice(result.source.index, 1);
    newColumns.splice(result.destination.index, 0, removed);
    setColumns(newColumns);

    const newColummnSet = newColumns.map((column, index) => {
      return {
        _id: column._id,
        order: index,
      };
    });
    updateColumnSet(newColummnSet);
  };

  return (
    <div className={styles.container}>
      <EditableBoardTitle level={2} text={title} boardId={boardId} owner={owner} users={users} />
      <div className={styles.columnsContainer}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="columns" direction="horizontal">
            {(provided) => (
              <ul className={styles.columns} {...provided.droppableProps} ref={provided.innerRef}>
                {columns &&
                  columns.map((column, index) => (
                    <Column column={column} key={column._id} index={index} />
                  ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        <div className={styles.createButton}>
          <Button
            type="transparent-dark"
            text={t('Board.addColumn')}
            big={false}
            iconType="add-cross"
            iconWidth="12"
            onClick={() => setCreateModalActive(true)}
          />
        </div>
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
