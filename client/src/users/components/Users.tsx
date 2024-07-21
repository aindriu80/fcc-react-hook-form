import { Stack, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { RHFAutocomplete } from '../../components/RHFAutocomplete';
import { RHFToggleButtonGroup } from '../../components/RHFToggleButton';
import { useLanguages, useStates } from '../services/queries';
import { Schema } from '../utils/schema';

const Users = () => {
  const statesQuery = useStates();
  const languagesQuery = useLanguages();

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
        options={statesQuery.data}
      />
      <RHFToggleButtonGroup<Schema>
        name="languagesSpoken"
        options={languagesQuery.data}
      />
    </Stack>
  );
};

export default Users;
