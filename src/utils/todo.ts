import { TODO_STATUS } from '@/lib/constants/todo';
import { type Todo, type TodoStatus } from '@/types/todo';
import { parseISO } from 'date-fns';
import { isOverdue } from './date';

export function sortTodos(todos: Todo[]): Todo[] {
  return [...todos].sort((a, b) => {
    // Completed items at the bottom
    if (a.isComplete !== b.isComplete) {
      return a.isComplete ? 1 : -1;
    }

    // Overdue items at the top
    const aIsOverdue = isOverdue(a.dueDate, a.isComplete);
    const bIsOverdue = isOverdue(b.dueDate, b.isComplete);
    if (aIsOverdue !== bIsOverdue) {
      return aIsOverdue ? -1 : 1;
    }

    // Sort by due date (soonest at top)
    if (a.dueDate && b.dueDate) {
      return parseISO(a.dueDate).getTime() - parseISO(b.dueDate).getTime();
    }

    // Items without due dates below ones with due dates
    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;

    // Default: keep original order (by id)
    return parseInt(a.id) - parseInt(b.id);
  });
}

export function isValidTodoStatus(status: string): status is TodoStatus {
  return Object.values(TODO_STATUS).includes(status as TodoStatus);
}

export function filterTodos(
  todos: Todo[],
  filters: {
    searchTerm?: string;
    statusFilter?: TodoStatus;
  } = {},
) {
  const { searchTerm, statusFilter } = filters;
  let result = [...todos];

  // Apply search filter
  if (searchTerm) {
    const regex = new RegExp(searchTerm.trim(), 'i');
    result = result.filter((todo) => regex.test(todo.description));
  }

  // Apply status filter
  if (statusFilter && statusFilter !== TODO_STATUS.ALL) {
    result = result.filter((todo) => {
      switch (statusFilter) {
        case TODO_STATUS.ACTIVE:
          return !todo.isComplete;
        case TODO_STATUS.COMPLETED:
          return todo.isComplete;
        case TODO_STATUS.OVERDUE:
          return isOverdue(todo.dueDate, todo.isComplete);
        default:
          return true;
      }
    });
  }

  return result;
}
