/* eslint-disable react-hooks/exhaustive-deps */

import React, { FC, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import Select, { MultiValue, StylesConfig } from 'react-select';
import { useTranslation } from 'react-i18next';

import styles from './EditTaskModal.module.scss';
import { ITask } from 'models';
import { BoardAPI, useAppSelector } from 'store';
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

interface EditTaskModalProps {
  task: ITask;
  onCancel: () => void;
}

const EditTaskModal: FC<EditTaskModalProps> = ({
  task: { _id: taskId, description, title, users: taskUsers, boardId, columnId, userId, order },
  onCancel,
}) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title,
      description,
    },
  });

  const { allUsers } = useAppSelector((state) => state.user);
  const [options, setOptions] = useState<ISelectOption[]>([]);
  const [selected, setSelected] = useState<ISelectOption[]>([]);

  const [updateTaskByBoardIdAndColumnId, { isLoading, error }] =
    BoardAPI.useUpdateTaskByBoardIdAndColumnIdAndTaskIdMutation();

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

  const getDefaultValue = () => {
    const options = allUsers
      ? allUsers.map((user) => ({
          value: user._id,
          label: user.name,
        }))
      : [];

    const selected = options.filter((option) =>
      taskUsers.includes((option as ISelectOption).value)
    );

    return selected;
  };

  const handleSelectChange = (newValue: MultiValue<unknown>) => {
    setSelected(newValue as ISelectOption[]);
  };

  const onSubmit = async (data: FieldValues) => {
    const { title, description } = data;
    const users = selected.length ? [...selected].map((option) => option.value) : taskUsers;

    await updateTaskByBoardIdAndColumnId({
      boardId,
      columnId,
      taskId,
      body: {
        title,
        userId,
        description,
        columnId,
        order,
        users,
      },
    });

    onCancel();
  };

  return (
    <div className={styles.container}>
      <div className={styles.backdrop} onClick={onCancel} />
      <div className={styles.body}>
        <button className={styles.closeButton} onClick={onCancel}>
          X
        </button>
        <Heading level={2} text={title} className={styles.heading} />
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
            defaultValue={getDefaultValue()}
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
              text={t('Common.update')}
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
    </div>
  );
};

export default EditTaskModal;
