/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import styles from './BoardPage.module.scss';
import { BoardAPI } from 'store/services/BoardService';
import { IError } from 'models';
import Heading from 'components/atoms/Heading';
import Board from 'components/Board';

interface IParams {
  id: string;
}

const BoardPage = () => {
  const { id: boardId } = useParams<keyof IParams>() as IParams;
  const { t } = useTranslation();

  const { data: board, error, isLoading } = BoardAPI.useGetBoardByIdQuery(boardId);

  return (
    <main className="main">
      <div className={`container ${styles.container}`}>
        {board && <Board board={board} />}

        {isLoading && <Heading level={2} text={t('Common.loading')} />}

        {error && (
          <Heading
            level={2}
            text={`${t('Common.serverError')} (${(error as IError).data.message})`}
          />
        )}
      </div>
    </main>
  );
};

export default BoardPage;
