import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Option } from '../../types/option';
import { ApiGet } from '../types/apiTypes';

export function useStates() {
  return useQuery({
    queryKey: ['states'],
    queryFn: () =>
      axios
        .get<Option[]>('http://localhost:8080/states')
        .then((res) => res.data),
  });
}

export function useLanguages() {
  return useQuery({
    queryKey: ['languages'],
    queryFn: () =>
      axios
        .get<Option[]>('http://localhost:8080/languages')
        .then((res) => res.data),
  });
}

export function useGenders() {
  return useQuery({
    queryKey: ['genders'],
    queryFn: () =>
      axios
        .get<Option[]>('http://localhost:8080/genders')
        .then((res) => res.data),
  });
}

export function useSkills() {
  return useQuery({
    queryKey: ['skills'],
    queryFn: () =>
      axios
        .get<Option[]>('http://localhost:8080/skills')
        .then((res) => res.data),
  });
}

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: (): Promise<Option[]> =>
      axios.get<ApiGet[]>('http://localhost:8080/users').then((response) =>
        response.data.map(
          (user) =>
            ({
              id: user.id,
              label: user.name,
            }) satisfies Option,
        ),
      ),
  });
}
