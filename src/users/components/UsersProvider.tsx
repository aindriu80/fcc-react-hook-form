import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { schema, Schema } from '../utils/schema';
import Users from './Users';

export function UsersProvider() {
  const methods = useForm<Schema>({
    mode: 'all',
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <Users />
    </FormProvider>
  );
}
