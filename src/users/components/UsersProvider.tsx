import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { defaultValues, schema, Schema } from '../utils/schema';
import Users from './Users';
import { DevTool } from '@hookform/devtools';

export function UsersProvider() {
  const methods = useForm<Schema>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <Users />
      <DevTool control={methods.control} />
    </FormProvider>
  );
}
