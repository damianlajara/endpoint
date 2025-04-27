import { TODO_STATUS } from '@/lib/constants/todo';

export interface Todo {
  id: string;
  description: string;
  isComplete: boolean;
  dueDate: string | null;
}

export type TodoStatus = (typeof TODO_STATUS)[keyof typeof TODO_STATUS];
