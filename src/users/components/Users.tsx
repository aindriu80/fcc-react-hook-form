import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Schema } from '../utils/schema';
const Users = () => {
  const { register } = useForm<Schema>({ mode: 'all' });


  return (
    <>
      <TextField {...register(''')}/>
    </>
  );
};

export default Users;
