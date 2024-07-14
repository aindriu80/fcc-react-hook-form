import { useForm } from 'react-hook-form';
const Users = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{ email: string }>({ mode: 'all' });

  const onSubmit = () => {
    console.log('submit');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          required: { value: true, message: 'The email is required' },
          maxLength: { value: 10, message: 'Too many characters' },
        })}
        placeholder="Email"
      />
      <p>{errors.email?.message}</p>
    </form>
  );
};

export default Users;
