import {
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { RHFAutocomplete } from '../../components/RHFAutocomplete';
import { RHFCheckboxGroup } from '../../components/RHFCheckboxGroup';
import { RHFDateRangePicker } from '../../components/RHFDateRangePicker';
import { RHFDateTimePicker } from '../../components/RHFDateTimePicker';
import { RHFRadioGroup } from '../../components/RHFRadioGroup';
import { RHFSlider } from '../../components/RHFSlider';
import { RHFSwitch } from '../../components/RHFSwitch';
import { RHFTextField } from '../../components/RHFTextField';
import { RHFToggleButtonGroup } from '../../components/RHFToggleButtonGroup';
import {
  useGenders,
  useLanguages,
  useSkills,
  useStates,
  useUser,
  useUsers,
} from '../services/queries';
import { Schema, defaultValues } from '../types/schema';

const Users = () => {
  const statesQuery = useStates();
  const languagesQuery = useLanguages();
  const gendersQuery = useGenders();
  const skillsQuery = useSkills();
  const usersQuery = useUsers();

  const { watch, control, unregister, reset, setValue } =
    useFormContext<Schema>();

  watch('states');

  const id = useWatch({ control, name: 'id' });

  const userQuery = useUser(id);

  useEffect(() => {
    const sub = watch((value) => {
      console.log(value);
    });

    return () => sub.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (userQuery.data) {
      reset(userQuery.data);
    }
  }, [reset, userQuery.data]);

  const isTeacher = useWatch({ control, name: 'isTeacher' });

  const { append, fields, remove, replace } = useFieldArray({
    control,
    name: 'students',
  });

  const handleUserClick = (id: string) => {
    setValue('id', id);
  };

  useEffect(() => {
    if (!isTeacher) {
      replace([]);
      unregister('students');
    }
  }, [isTeacher, replace, unregister]);

  const handleReset = () => {
    reset(defaultValues);
  };

  return (
    <Container maxWidth="sm" component="form">
      <Stack sx={{ flexDirection: 'row', gap: 2 }}>
        <List subheader={<ListSubheader>Users</ListSubheader>}>
          {usersQuery.data?.map((user) => (
            <ListItem disablePadding key={user.id}>
              <ListItemButton
                onClick={() => handleUserClick(user.id)}
                selected={id === user.id}
              >
                <ListItemText primary={user.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Stack sx={{ gap: 2 }}>
          <RHFTextField<Schema> name="name" label="Name" />
          <RHFTextField<Schema> name="email" label="Email" />
          <RHFAutocomplete<Schema>
            name="states"
            label="States"
            options={statesQuery.data}
          />
          <RHFToggleButtonGroup<Schema>
            name="languagesSpoken"
            options={languagesQuery.data}
          />
          <RHFRadioGroup<Schema>
            name="gender"
            options={gendersQuery.data}
            label="Gender"
          />
          <RHFCheckboxGroup<Schema>
            name="skills"
            options={skillsQuery.data}
            label="Skills"
          />
          <RHFDateTimePicker<Schema>
            name="registrationDateAndTime"
            label="registration Date & Time"
          />
          <Typography>Former Employment Period:</Typography>
          <RHFDateRangePicker<Schema>
            name="formerEmploymentPeriod"
            label="label"
          />
          <RHFSlider<Schema> name="salaryRange" label="Salary Range" />
          <RHFSwitch<Schema> name="isTeacher" label="Are you a teacher?" />

          {isTeacher && (
            <Button onClick={() => append({ name: '' })} type="button">
              Add new student
            </Button>
          )}

          {fields.map((field, index) => (
            <Fragment key={field.id}>
              <RHFTextField name={`students.${index}.name`} label="Name" />
              <Button color="error" onClick={() => remove(index)} type="button">
                Remove
              </Button>
            </Fragment>
          ))}
          <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button type="submit">New User</Button>
            <Button onClick={handleReset}>Reset</Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Users;
