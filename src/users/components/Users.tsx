import { Stack, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { RHFAutocomplete } from '../../components/RHFAutocomplete';
import { Schema } from '../utils/schema';

const Users = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Schema>();
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
      <RHFAutocomplete name="states" />
    </Stack>
  );
};

export default Users;
