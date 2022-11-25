import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import Modal from 'components/atoms/Modal';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styles from './CreateBoardForm.module.scss';

const CreateBoardForm = ({
  setCreateBoardModal,
}: {
  setCreateBoardModal: (bool: boolean) => void;
}) => {
  const { register, handleSubmit } = useForm();

  const { t } = useTranslation();

  const handleCreateBoardSubmit = (data: FieldValues) => {
    const boardData = {
      title: data.title,
      description: data.description,
    };
    console.log(boardData);
  };

  return (
    <Modal
      onClose={() => {
        setCreateBoardModal(false);
      }}
    >
      <form onSubmit={handleSubmit(handleCreateBoardSubmit)} className={styles.createBoardModal}>
        <h2 className={styles.formTitle}>{t('MainPage.createBoardform.createBoard')}</h2>
        <Input
          type="text"
          name="title"
          showError={false}
          register={register}
          placeholder={`${t('MainPage.createBoardform.title')}`}
        />
        <Input
          type="text"
          name="description"
          showError={false}
          register={register}
          placeholder={`${t('MainPage.createBoardform.description')}`}
        />
        <div className={styles.buttons}>
          <Button
            type="bordered"
            text={`${t('MainPage.createBoardform.cancel')}`}
            big={true}
            onClick={() => {
              setCreateBoardModal(false);
            }}
          />
          <Button
            type="primary"
            text={`${t('MainPage.createBoardform.create')}`}
            big={true}
            onClick={() => {}}
          />
        </div>
      </form>
    </Modal>
  );
};

export default CreateBoardForm;
