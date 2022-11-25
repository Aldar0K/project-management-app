/* eslint-disable react-hooks/exhaustive-deps */

import React, { FC, useEffect, useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import Select, { MultiValue, StylesConfig } from 'react-select';

import styles from './CreateTaskForm.module.scss';
import { BoardAPI, useAppSelector } from 'store';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';
import Heading from 'components/atoms/Heading';
import ErrorModal from 'components/atoms/errorModal';
import { COLOR_LIGHT, COLOR_PRIMARY } from '../../constants';

const selectStyles: StylesConfig = {
  control: (styles, { isFocused, isDisabled }) => {
    return {
      ...styles,
      backgroundColor: COLOR_LIGHT,
      border: 'none',
      boxShadow: isFocused ? 'none' : 'inherit',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
    };
  },
  option: (styles, { isDisabled }) => {
    return {
      ...styles,
      backgroundColor: COLOR_LIGHT,
      color: COLOR_PRIMARY,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    fontSize: '0.875rem',
    color: COLOR_PRIMARY,
    backgroundColor: COLOR_LIGHT,
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: COLOR_PRIMARY,
    backgroundColor: COLOR_LIGHT,
  }),
};

interface ISelectOption {
  value: string;
  label: string;
}

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

  const { id: userId, allUsers } = useAppSelector((state) => state.user);
  const [options, setOptions] = useState<ISelectOption[]>([]);
  const [selected, setSelected] = useState<ISelectOption[]>([]);

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

  useEffect(() => {
    const options = allUsers
      ? allUsers.map((user) => ({
          value: user._id,
          label: user.name,
        }))
      : [];
    setOptions(options as ISelectOption[]);
  }, []);

  const handleSelectChange = (newValue: MultiValue<unknown>) => {
    setSelected(newValue as ISelectOption[]);
  };

  const onSubmit = async (data: FieldValues) => {
    const { title, description } = data;
    const users = [...selected].map((option) => option.value);

    await createTaskByBoardIdAndColumnId({
      boardId,
      columnId,
      body: {
        title,
        description,
        order: tasksLength + 1,
        userId,
        users,
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
        <Select
          {...register('users')}
          className={styles.select}
          options={options}
          isMulti
          styles={selectStyles}
          onChange={handleSelectChange}
        />
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
