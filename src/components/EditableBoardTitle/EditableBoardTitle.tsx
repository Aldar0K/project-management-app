import React, { FC, useEffect, useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import styles from './EditableBoardTitle.module.scss';
import { BoardAPI } from 'store';

import Icon from 'components/atoms/Icon';
import Input from 'components/atoms/Input';
import Heading from 'components/atoms/Heading';
import ErrorModal from 'components/atoms/errorModal';

interface EditableBoardTitleProps {
  level: 1 | 2 | 3 | 4;
  text: string;
  boardId: string;
  owner: string;
  users: string[];
}

const EditableBoardTitle: FC<EditableBoardTitleProps> = ({
  level,
  text,
  boardId,
  owner,
  users,
}) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [edit, setEdit] = useState(false);
  const [updateBoardById, { isLoading, error }] = BoardAPI.useUpdateBoardByIdMutation();
  const [isModalActive, setModalActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (error && 'data' in error) {
      setErrorMessage(error.data.message);
      setModalActive(true);
    } else {
      setModalActive(false);
    }
  }, [error]);

  const handleEdit = () => {
    clearErrors('title');
    setValue('title', text);
    setEdit(true);
  };

  const onSubmit = (data: FieldValues) => {
    const { title } = data;

    if (title.trim() !== text) {
      updateBoardById({ id: boardId, body: { title, owner, users } });
    }

    setEdit(false);
  };

  const handleCancel = () => setEdit(false);

  return (
    <div className={styles.container}>
      {edit ? (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            name="title"
            register={register}
            rules={{
              required: true,
            }}
            showError={!!errors.title}
          />
          <div className={styles.controls}>
            <button type="submit" className={styles.confirm} title={t('Common.confirm') as string}>
              <Icon type="confirm" width="22" />
            </button>
            <button
              type="reset"
              className={styles.reset}
              onClick={handleCancel}
              title={t('Common.cancel') as string}
            >
              <Icon type="cancel" width="22" />
            </button>
          </div>
        </form>
      ) : (
        <div className={styles.title} onClick={handleEdit}>
          <Heading
            className={styles.heading}
            level={level}
            text={isLoading ? t('Common.loading') : text}
          />
          <button className={styles.edit} onClick={handleEdit} title={t('Common.edit') as string}>
            <Icon type="edit" width="22" />
          </button>
        </div>
      )}

      {isModalActive && (
        <ErrorModal onClose={() => setModalActive(false)}>
          <h3>{errorMessage}</h3>
        </ErrorModal>
      )}
    </div>
  );
};

export default EditableBoardTitle;
