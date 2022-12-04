import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './Navigation.module.scss';
import { AuthorizationAPI } from '../../store/services/UserService';
import { removeUser, useAppDispatch, useAppSelector } from 'store';

import Button from 'components/atoms/Button';
import Heading from 'components/atoms/Heading';
import Modal from 'components/atoms/Modal';
import CreateBoardForm from 'components/CreateBoardForm';

const Navigation = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  AuthorizationAPI.useGetAllUsersQuery();

  const { name } = useAppSelector((state) => state.user);

  const [isCreateModalActive, setCreateModalActive] = useState(false);

  const goToMain = () => {
    navigate('/main');
  };

  const goToProfile = () => {
    navigate('/editProfile');
  };

  const handleAddBoard = () => {
    navigate('/main');
    setCreateModalActive(true);
  };

  const handleSignout = async () => {
    if (token) {
      dispatch(removeUser());
      localStorage.removeItem('token');
    }
  };

  return (
    <nav className={styles.container}>
      <ul className={styles.list}>
        {token ? (
          <>
            <li className={styles.item}>
              <Button text={t('Navigation.main')} type="bordered" big={false} onClick={goToMain} />
            </li>
            <li className={styles.item}>
              <Button
                text={t('Board.addBoard')}
                type="bordered"
                big={false}
                onClick={handleAddBoard}
              />
            </li>
            <li className={styles.item}>
              <Heading text={name} level={3} className={styles.name} />
            </li>
            <li className={styles.item}>
              <Button
                text={t('Navigation.profile')}
                type="bordered"
                big={false}
                onClick={goToProfile}
              />
            </li>
            <li className={styles.item}>
              <Button
                text={t('Navigation.signOut')}
                type="bordered"
                big={false}
                onClick={handleSignout}
              />
            </li>

            {isCreateModalActive && (
              <Modal onClose={() => setCreateModalActive(false)}>
                <CreateBoardForm onCancel={() => setCreateModalActive(false)} />
              </Modal>
            )}
          </>
        ) : (
          <>
            <li className={styles.item}>
              <Link to="/login" className={styles.link}>
                <Button
                  text={t('Navigation.signIn')}
                  type="bordered"
                  big={false}
                  onClick={handleSignout}
                />
              </Link>
            </li>
            <li className={styles.item}>
              <Link to="/registration" className={styles.link}>
                <Button
                  text={t('Navigation.signUp')}
                  type="bordered"
                  big={false}
                  onClick={handleSignout}
                />
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
