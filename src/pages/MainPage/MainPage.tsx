import BoardInstance from 'components/BoardItem/BoardInstance';
import BoardPlus from 'components/BoardItem/BoardPlus';
import CreateBoardForm from 'components/BoardItem/CreateBoardForm/CreateBoardForm';
import React, { useState } from 'react';
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
  const [createBoardModal, setCreateBoardModal] = useState(false);
  return (
    <div className="main">
      <div className={`container`}>
        <ul className={styles.container}>
          {fakeApi.map((board) => (
            <li key={board._id}>
              <BoardInstance board={board} setModal={setCreateBoardModal} />
            </li>
          ))}
          <li>
            <BoardPlus setModal={setCreateBoardModal} />
          </li>
        </ul>
        {createBoardModal && <CreateBoardForm setCreateBoardModal={setCreateBoardModal} />}
      </div>
    </div>
  );
};

export default MainPage;
