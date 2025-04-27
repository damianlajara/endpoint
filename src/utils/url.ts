import { TODO_STATUS } from '@/lib/constants/todo';
import { TodoStatus } from '@/types/todo';
import { ReadonlyURLSearchParams } from 'next/navigation';

export const removeSearchParams = (
  searchParams: ReadonlyURLSearchParams,
  key: string,
) => {
  const params = new URLSearchParams(searchParams);
  params.delete(key);
  return params.toString();
};

export const setSearchParams = (
  searchParams: ReadonlyURLSearchParams,
  value: string,
  key: string = 'search',
) => {
  const params = new URLSearchParams(searchParams);
  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }
  return params.toString();
};

export const getSearchParamValue = (searchParams: ReadonlyURLSearchParams) =>
  searchParams.get('search') || '';

export const getStatusFilterParamValue = (
  searchParams: ReadonlyURLSearchParams,
) => (searchParams.get('status') as TodoStatus) || TODO_STATUS.ALL;
