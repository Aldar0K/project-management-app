import ErrorModal from 'components/atoms/errorModal';
import Heading from 'components/atoms/Heading';
import BoardInstance from 'components/BoardItem/BoardInstance';
import BoardPlus from 'components/BoardItem/BoardPlus';
import React, { useEffect, useState } from 'react';
import { BoardAPI } from 'store';
import styles from './MainPage.module.scss';

//mock data
const fakeApi = [
  {
    _id: '1',
    title: 'first',
    description: 'board 1',
  },
  {
    _id: '2',
    title: 'second',
    description: 'board 2',
  },
  {
    _id: '3',
    title: 'third',
    description: 'board 3',
  },
];

const MainPage = () => {
  const { data: boards, isLoading, error } = BoardAPI.useGetAllBoardsQuery();

  const [isErrorModalActive, setErrorModalActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (error && 'data' in error) {
      setErrorMessage(error.data.message);
      setErrorModalActive(true);
    } else {
      setErrorModalActive(false);
    }
  }, [error]);

  return (
    <>
      <div className="main">
        <div className={`container`}>
          {isLoading ? (
            <Heading level={2} text="Loading..." />
          ) : (
            <ul className={styles.container}>
              {boards &&
                boards.map((board) => (
                  <li key={board._id}>
                    <BoardInstance board={board} />
                  </li>
                ))}
              <li>
                <BoardPlus />
              </li>
            </ul>
          )}
        </div>
      </div>

      {isErrorModalActive && (
        <ErrorModal onClose={() => setErrorModalActive(false)}>
          <h3>{errorMessage}</h3>
        </ErrorModal>
      )}
    </>
  );
};

export default MainPage;
