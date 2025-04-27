import { Todo } from '@/types/todo';
import { urlFetch } from '@/utils/fetch';

type GetTodosResponse = Todo[];

type UpdateTodoResponse = {
  status: string;
};
export const getTodos = () => urlFetch<GetTodosResponse>('/get');

export const updateTodo = (id: Todo['id'], isComplete: boolean) =>
  urlFetch<UpdateTodoResponse>(`/patch/${id}`, {
    method: 'PATCH',
    body: {
      isComplete,
    },
  });
