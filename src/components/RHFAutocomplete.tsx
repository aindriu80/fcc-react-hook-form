import { Autocomplete } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

export function RHFAutocomplete() {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={(params) => <Autocomplete />}
    />
  );
}
