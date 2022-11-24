import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './Navigation.module.scss';
import { removeUser, useAppDispatch, useAppSelector } from 'store';
import Button from 'components/atoms/Button';
import Heading from 'components/atoms/Heading';

const Navigation = () => {
  const { t } = useTranslation();

  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const { name } = useAppSelector((state) => state.user);

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
              <Link to="/main" className={styles.link}>
                <Button
                  text={t('Navigation.main')}
                  type="bordered"
                  big={false}
                  onClick={() => {}}
                />
              </Link>
            </li>
            <li className={styles.item}>
              <Heading text={name} level={3} className={styles.name} />
            </li>

            <li className={styles.item}>
              <Button
                text={t('Navigation.signOut')}
                type="bordered"
                big={false}
                onClick={handleSignout}
              />
            </li>
            <li className={styles.item}>
              <Link to="/editProfile" className={styles.link}>
                <Button
                  text={t('Navigation.profile')}
                  type="bordered"
                  big={false}
                  onClick={() => {}}
                />
              </Link>
            </li>
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
