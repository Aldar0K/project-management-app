import React, { FC } from 'react';
import { useForm, FieldValues } from 'react-hook-form';

import styles from './CreateTaskForm.module.scss';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';
import Heading from 'components/atoms/Heading';

interface CreateTaskFormProps {
  onCancel: () => void;
}

const CreateTaskForm: FC<CreateTaskFormProps> = ({ onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <Heading level={2} text="Create task" className={styles.heading} />
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
          <Button type="bordered" text="Cancel" big={false} onClick={onCancel} />
          <Button type="primary" text="Create" big={false} onClick={() => {}} />
        </div>
      </form>
    </div>
  );
};

export default CreateTaskForm;
