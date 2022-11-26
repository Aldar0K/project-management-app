/* eslint-disable react-hooks/exhaustive-deps */

import React, { FC, useEffect, useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import Select, { MultiValue, StylesConfig } from 'react-select';
import { useTranslation } from 'react-i18next';

import { BoardAPI, useAppSelector } from 'store';
import styles from './CreateTaskForm.module.scss';
import { COLOR_LIGHT, COLOR_PRIMARY } from '../../constants';

import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';
import Heading from 'components/atoms/Heading';
import ErrorModal from 'components/atoms/errorModal';

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
  const { t } = useTranslation();

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
      <Heading level={2} text={t('Board.addTask')} className={styles.heading} />
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
        <Input
          type="text"
          name="description"
          placeholder={t('Board.descPlaceholder') as string}
          register={register}
          rules={{
            required: true,
          }}
          showError={!!errors.title}
          errorMessage={t('Board.descError') as string}
        />
        <Select
          {...register('users')}
          className={styles.select}
          placeholder={t('Board.usersPlaceholder') as string}
          options={options}
          isMulti
          styles={selectStyles}
          onChange={handleSelectChange}
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

export default CreateTaskForm;
