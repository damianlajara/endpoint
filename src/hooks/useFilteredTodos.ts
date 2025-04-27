import { type Todo } from '@/types/todo';
import { filterTodos } from '@/utils/todo';
import { getSearchParamValue, getStatusFilterParamValue } from '@/utils/url';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export function useFilteredTodos(todos: Todo[]) {
  const searchParams = useSearchParams();

  const searchTerm = getSearchParamValue(searchParams);

  const statusFilter = getStatusFilterParamValue(searchParams);

  const filteredTodos = useMemo(() => {
    return filterTodos(todos, {
      searchTerm,
      statusFilter,
    });
  }, [todos, searchTerm, statusFilter]);

  return {
    filteredTodos,
    searchTerm,
    statusFilter,
  };
}
