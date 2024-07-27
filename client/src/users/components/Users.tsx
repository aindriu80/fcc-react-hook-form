import { Stack, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { RHFAutocomplete } from '../../components/RHFAutocomplete';
import { RHFCheckboxGroup } from '../../components/RHFCheckboxGroup';
import { RHFDateRangePicker } from '../../components/RHFDateRangePicker';
import { RHFDateTimePicker } from '../../components/RHFDateTimePicker';
import { RHFRadioGroup } from '../../components/RHFRadioGroup';
import { RHFSlider } from '../../components/RHFSlider';
import { RHFSwitch } from '../../components/RHFSwitch';
import { RHFToggleButtonGroup } from '../../components/RHFToggleButtonGroup';
import {
  useGenders,
  useLanguages,
  useSkills,
  useStates,
} from '../services/queries';
import { Schema } from '../utils/schema';

const Users = () => {
  const statesQuery = useStates();
  const languagesQuery = useLanguages();
  const gendersQuery = useGenders();
  const skillsQuery = useSkills();

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
      <RHFDateRangePicker<Schema> name="formerEmploymentPeriod" label="label" />
      <RHFSlider<Schema> name="salaryRange" label="Salary Range" />
      <RHFSwitch<Schema> name="isTeacher" label="Are you a teacher?" />
    </Stack>
  );
};

export default Users;
