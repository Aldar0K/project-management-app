import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './Navigation.module.scss';
import { AuthorizationAPI } from '../../store/services/UserService';
import { removeUser, useAppDispatch, useAppSelector } from 'store';

import Heading from 'components/atoms/Heading';
import Modal from 'components/atoms/Modal';
import CreateBoardForm from 'components/CreateBoardForm';

const Navigation = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  AuthorizationAPI.useGetAllUsersQuery();

  const [active, setActive] = useState(false);
  const [isCreateModalActive, setCreateModalActive] = useState(false);

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
      <ul
        className={`${styles.list} ${active ? styles.list_active : ''}`}
        onClick={() => setActive(false)}
      >
        {token ? (
          <>
            <li className={styles.item}>
              <NavLink to="/main">
                {(state) => (
                  <Heading
                    level={3}
                    text={t('Navigation.main')}
                    className={`${styles.link} ${state.isActive ? styles.link_active : ''}`}
                  />
                )}
              </NavLink>
            </li>
            <li className={styles.item} onClick={handleAddBoard}>
              <Heading level={3} text={t('Board.addBoard')} className={styles.link} />
            </li>
            <li className={styles.item}>
              <NavLink to="/editProfile">
                {(state) => (
                  <Heading
                    level={3}
                    text={t('Navigation.profile')}
                    className={`${styles.link} ${state.isActive ? styles.link_active : ''}`}
                  />
                )}
              </NavLink>
            </li>
            <li className={styles.item} onClick={handleSignout}>
              <Heading level={3} text={t('Navigation.signOut')} className={styles.link} />
            </li>
          </>
        ) : (
          <>
            <li className={styles.item} onClick={handleSignout}>
              <NavLink to="/login">
                {(state) => (
                  <Heading
                    level={3}
                    text={t('Navigation.signIn')}
                    className={`${styles.link} ${state.isActive ? styles.link_active : ''}`}
                  />
                )}
              </NavLink>
            </li>
            <li className={styles.item} onClick={handleSignout}>
              <NavLink to="/registration">
                {(state) => (
                  <Heading
                    level={3}
                    text={t('Navigation.signUp')}
                    className={`${styles.link} ${state.isActive ? styles.link_active : ''}`}
                  />
                )}
              </NavLink>
            </li>
          </>
        )}
      </ul>

      <div
        className={`${styles.menuIcon} ${active ? styles.menuIcon_active : ''}`}
        onClick={() => setActive(!active)}
      >
        <span></span>
      </div>

      {isCreateModalActive && (
        <Modal onClose={() => setCreateModalActive(false)}>
          <CreateBoardForm onCancel={() => setCreateModalActive(false)} />
        </Modal>
      )}
    </nav>
  );
};

export default Navigation;
