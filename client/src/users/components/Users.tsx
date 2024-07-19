import { Stack, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { RHFAutocomplete } from '../../components/RHFAutocomplete';
import { Schema } from '../utils/schema';

const Users = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<Schema>();

  watch('states');

  useEffect(() => {
    const sub = watch((value) => {
      console.log(value);
    });

    return () => sub.unsubscribe();
  }, [watch]);

  return (
    <Stack sx={{ gap: 2 }}>
      <TextField
        {...register('name')}
        label="Name"
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        {...register('email')}
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <RHFAutocomplete<Schema>
        name="states"
        label="States"
        options={[
          { id: '1', label: 'California' },
          { id: '2', label: 'Texas' },
        ]}
      />
    </Stack>
  );
};

export default Users;
