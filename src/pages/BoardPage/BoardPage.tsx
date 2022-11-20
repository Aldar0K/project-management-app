/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import styles from './BoardPage.module.scss';
import { useAppSelector } from 'store';
import { BoardAPI } from 'store/services/BoardService';
import { IError } from 'models';
import Heading from 'components/atoms/Heading';
import Board from 'components/Board';

interface IParams {
  id: string;
}

const BoardPage = () => {
  const { id: boardId } = useParams<keyof IParams>() as IParams;
  const { token } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const { data: board, error, isLoading } = BoardAPI.useGetBoardByIdQuery(boardId);

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, []);

  return (
    <main className="main">
      <div className={`container ${styles.container}`}>
        {board && <Board board={board} />}

        {isLoading && <Heading level={2} text="Loading..." />}

        {error && (
          <Heading level={2} text={`Something went wrong (${(error as IError).data.message})`} />
        )}
      </div>
    </main>
  );
};

export default BoardPage;
