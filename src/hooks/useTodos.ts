import apiService from '@/lib/api';
import { Todo } from '@/types/todo';
import { sortTodos } from '@/utils/todo';
import { useCallback, useEffect, useState } from 'react';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { todo: todoApi } = apiService;

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await todoApi.getTodos();
      const sortedTodos = sortTodos(response);
      setTodos(sortedTodos);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch todos:', err);
      setError('Failed to fetch todos. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [todoApi]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const toggleTodoCompletion = useCallback(
    async (todoId: string, isComplete: boolean) => {
      try {
        setUpdatingId(todoId);

        await todoApi.updateTodo(todoId, isComplete);

        const updatedTodos = todos.map((todo) =>
          todo.id === todoId ? { ...todo, isComplete } : todo,
        );

        setTodos(sortTodos(updatedTodos));
        setError(null);
      } catch (err) {
        console.error('Failed to update todo:', err);
        setError(`Failed to update todo. Please try again.`);
      } finally {
        setUpdatingId(null);
      }
    },
    [todos, todoApi],
  );

  return {
    todos,
    loading,
    updatingId,
    error,
    fetchTodos,
    toggleTodoCompletion,
  };
}
