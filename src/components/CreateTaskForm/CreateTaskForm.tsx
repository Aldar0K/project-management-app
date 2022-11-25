import React, { FC, useEffect, useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';

import styles from './CreateTaskForm.module.scss';
import { BoardAPI, useAppSelector } from 'store';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';
import Heading from 'components/atoms/Heading';
import ErrorModal from 'components/atoms/errorModal';

interface CreateTaskFormProps {
  boardId: string;
  columnId: string;
  tasksLength: number;
  onCancel: () => void;
}

const CreateTaskForm: FC<CreateTaskFormProps> = ({ boardId, columnId, tasksLength, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { id: userId } = useAppSelector((state) => state.user);
  const [createTaskByBoardIdAndColumnId, { isLoading, error }] =
    BoardAPI.useCreateTaskByBoardIdAndColumnIdMutation();

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
    const { title, description } = data;

    await createTaskByBoardIdAndColumnId({
      boardId,
      columnId,
      body: {
        title,
        description,
        order: tasksLength + 1,
        userId,
        users: [],
      },
    });

    onCancel();
  };

  return (
    <div className={styles.container}>
      <Heading level={2} text="Add new task" className={styles.heading} />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          name="title"
          placeholder="Task title"
          register={register}
          rules={{
            required: true,
          }}
          showError={!!errors.title}
        />
        <Input
          type="text"
          name="description"
          placeholder="Task description"
          register={register}
          rules={{
            required: true,
          }}
          showError={!!errors.title}
        />
        {/* TODO add a selection of responsible users */}
        <div className={styles.controls}>
          <Button type="bordered" isSubmit={false} text="Cancel" big={true} onClick={onCancel} />
          <Button type="primary" text="Create" big={true} onClick={() => {}} loading={isLoading} />
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

export default CreateTaskForm;
