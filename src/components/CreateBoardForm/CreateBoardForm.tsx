import React, { FC, useEffect, useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';

import styles from './CreateBoardForm.module.scss';
import { BoardAPI, useAppSelector } from 'store';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';
import Heading from 'components/atoms/Heading';
import ErrorModal from 'components/atoms/errorModal';
import { useTranslation } from 'react-i18next';

interface CreateBoardFormProps {
  onCancel: () => void;
}

const CreateBoardForm: FC<CreateBoardFormProps> = ({ onCancel }) => {
  const { t } = useTranslation();
  const { id: userId } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [createBoard, { isLoading, error }] = BoardAPI.useCreateBoardMutation();

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

  const onSubmit = async (data: FieldValues) => {
    const { title } = data;

    await createBoard({
      title,
      owner: userId,
      users: [],
    });

    onCancel();
  };

  return (
    <div className={styles.container}>
      <Heading level={2} text={t('Board.addBoard')} className={styles.heading} />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          name="title"
          placeholder={t('Board.titlePlaceholder') as string}
          register={register}
          rules={{
            required: true,
          }}
          showError={!!errors.title}
          errorMessage={t('Board.titleError') as string}
        />
        <div className={styles.controls}>
          <Button
            type="bordered"
            isSubmit={false}
            text={t('Common.cancel')}
            big={true}
            onClick={onCancel}
          />
          <Button
            type="primary"
            text={t('Common.create')}
            big={true}
            onClick={() => {}}
            loading={isLoading}
          />
        </div>
      </form>

      {isErrorModalActive && (
        <ErrorModal onClose={() => setErrorModalActive(false)}>
          <h3>{errorMessage}</h3>
        </ErrorModal>
      )}
    </div>
  );
};

export default CreateBoardForm;
