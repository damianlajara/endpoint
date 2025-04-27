import { type TodoStatus } from '@/types/todo';

export const TODO_STATUS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  OVERDUE: 'overdue',
} as const;

export const STATUS_LABELS: Record<TodoStatus, string> = {
  [TODO_STATUS.ALL]: 'All Tasks',
  [TODO_STATUS.ACTIVE]: 'Active',
  [TODO_STATUS.COMPLETED]: 'Completed',
  [TODO_STATUS.OVERDUE]: 'Overdue',
};
