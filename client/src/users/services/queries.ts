import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Option } from '../../types/option';

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
        .get<Option[]>('http://localhost:8080/languges')
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
