import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import styles from './CreateBoardModal.module.scss';
import Select, { MultiValue, StylesConfig } from 'react-select';

interface ISelectOption {
  value: string;
  label: string;
}

// FakeApi served only for test render
// interface IFakeData {
//   id: number;
//   name: string;
//   login: string;
// }

const users = [
  {
    id: 1,
    name: 'Dima',
    login: 'swan_023046',
  },
  {
    id: 2,
    name: 'Rick',
    login: 'Rick_222',
  },
  {
    id: 3,
    name: 'Morty',
    login: 'Morty_111',
  },
];

const CreateBoardModal = () => {
  const { register, handleSubmit } = useForm();
  const [options, setOptions] = useState([] as ISelectOption[]);

  const handleCreateBoardSubmit = (data: FieldValues) => {
    const boardData = {
      title: data.title,
      users: options,
    };
    console.log(boardData);
  };

  const handleSelectChange = (newValue: MultiValue<unknown>) => {
    setOptions(newValue as unknown as ISelectOption[]);
  };

  const getOptions = () => {
    const options = users.map((user) => ({
      value: user.id,
      label: user.login,
    }));
    return options;
  };

  const selectStyles: StylesConfig = {
    control: (styles, state) => {
      const { isFocused } = state;
      return {
        ...styles,
        backgroundColor: '#F5F1EF',
        border: 'none',
        boxShadow: isFocused ? 'none' : 'inherit',
      };
    },
  };

  return (
    <div className={styles.modalContainer}>
      <form onSubmit={handleSubmit(handleCreateBoardSubmit)} className={styles.createBoardModal}>
        <h2 className={styles.formTitle}>Create board</h2>
        <Input type="text" name="title" showError={false} register={register} placeholder="title" />
        <Select
          {...register('users')}
          className={styles.select}
          options={getOptions()}
          isMulti
          styles={selectStyles}
          onChange={handleSelectChange}
        />
        <div className={styles.buttons}>
          <Button type="primary" text="Create" big={true} onClick={() => {}} />
          <Button type="primary" text="Cancel" big={true} onClick={() => {}} />
        </div>
      </form>
    </div>
  );
};

export default CreateBoardModal;
