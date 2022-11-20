import BoardInstance from 'components/BoardItem/BoardInstance';
import BoardPlus from 'components/BoardItem/BoardPlus';
import CreateBoardModal from 'components/BoardItem/CreateBoardModal/CreateBoardModal';
import React from 'react';
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
  return (
    <div className="main">
      <div className={`container`}>
        <ul className={styles.container}>
          {fakeApi.map((board) => (
            <li key={board._id}>
              <BoardInstance board={board} />
            </li>
          ))}
          <li>
            <BoardPlus />
          </li>
        </ul>
        {/* <CreateBoardModal /> */}
      </div>
    </div>
  );
};

export default MainPage;
