import React, { FC, useEffect, useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';

import styles from './CreateColumnForm.module.scss';
import { BoardAPI } from 'store';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';
import Heading from 'components/atoms/Heading';
import ErrorModal from 'components/atoms/errorModal';
import { useTranslation } from 'react-i18next';

interface CreateColumnFormProps {
  boardId: string;
  columnsLength: number;
  onCancel: () => void;
}

const CreateColumnForm: FC<CreateColumnFormProps> = ({ boardId, columnsLength, onCancel }) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [createColumnByBoardId, { isLoading, error }] = BoardAPI.useCreateColumnByBoardIdMutation();

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

    await createColumnByBoardId({
      boardId,
      body: {
        title,
        order: columnsLength,
      },
    });

    onCancel();
  };

  return (
    <div className={styles.container}>
      <Heading level={2} text={t('Board.addColumn')} className={styles.heading} />
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

export default CreateColumnForm;
