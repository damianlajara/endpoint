import { TODO_STATUS } from '@/lib/constants/todo';
import { mockTodos } from '@/lib/test/mockData';
import { addDays } from 'date-fns';
import { filterTodos, isValidTodoStatus, sortTodos } from './todo';

describe('Todo utilities', () => {
  describe('sortTodos', () => {
    it('places completed items at the bottom', () => {
      const sorted = sortTodos(mockTodos);

      expect(sorted[0].isComplete).toBe(false);

      expect(sorted[sorted.length - 1].isComplete).toBe(true);
      expect(sorted[sorted.length - 2].isComplete).toBe(true);
    });

    it('places overdue items at the top', () => {
      const sorted = sortTodos(mockTodos);

      // The first item should be the overdue one (id: 6)
      expect(sorted[0].id).toBe('6');
    });

    it('sorts by due date with soonest at top', () => {
      const today = new Date();
      const todoSoon = {
        id: '10',
        description: 'Soon',
        isComplete: false,
        dueDate: addDays(today, 1).toISOString(),
      };
      const todoLater = {
        id: '11',
        description: 'Later',
        isComplete: false,
        dueDate: addDays(today, 10).toISOString(),
      };

      const sorted = sortTodos([todoSoon, todoLater]);

      // The soon todo should be first
      expect(sorted[0].id).toBe('10');
      expect(sorted[1].id).toBe('11');
    });

    it('places items with due dates above items without due dates', () => {
      const todoWithDate = {
        id: '10',
        description: 'Has due date',
        isComplete: false,
        dueDate: new Date().toISOString(),
      };
      const todoWithoutDate = {
        id: '11',
        description: 'No due date',
        isComplete: false,
        dueDate: null,
      };

      const sorted = sortTodos([todoWithoutDate, todoWithDate]);

      // The todo with date should be first
      expect(sorted[0].id).toBe('10');
      expect(sorted[1].id).toBe('11');
    });
  });

  describe('isValidTodoStatus', () => {
    it('returns true for valid status values', () => {
      expect(isValidTodoStatus(TODO_STATUS.ALL)).toBe(true);
      expect(isValidTodoStatus(TODO_STATUS.ACTIVE)).toBe(true);
      expect(isValidTodoStatus(TODO_STATUS.COMPLETED)).toBe(true);
      expect(isValidTodoStatus(TODO_STATUS.OVERDUE)).toBe(true);
    });

    it('returns false for invalid status values', () => {
      expect(isValidTodoStatus('invalid')).toBe(false);
      expect(isValidTodoStatus('')).toBe(false);
    });
  });

  describe('filterTodos', () => {
    it('returns all todos when no filters are applied', () => {
      const filtered = filterTodos(mockTodos);
      expect(filtered.length).toBe(mockTodos.length);
    });

    it('filters by search term', () => {
      const filtered = filterTodos(mockTodos, { searchTerm: 'dog' });
      expect(filtered.length).toBe(1);
      expect(filtered[0].id).toBe('4');
    });

    it('filters by ACTIVE status', () => {
      const filtered = filterTodos(mockTodos, {
        statusFilter: TODO_STATUS.ACTIVE,
      });

      expect(filtered.every((todo) => !todo.isComplete)).toBe(true);

      const incompleteCount = mockTodos.filter(
        (todo) => !todo.isComplete,
      ).length;
      expect(filtered.length).toBe(incompleteCount);
    });

    it('filters by COMPLETED status', () => {
      const filtered = filterTodos(mockTodos, {
        statusFilter: TODO_STATUS.COMPLETED,
      });

      expect(filtered.every((todo) => todo.isComplete)).toBe(true);

      const completeCount = mockTodos.filter((todo) => todo.isComplete).length;
      expect(filtered.length).toBe(completeCount);
    });

    it('filters by OVERDUE status', () => {
      const filtered = filterTodos(mockTodos, {
        statusFilter: TODO_STATUS.OVERDUE,
      });

      expect(filtered.length).toBe(1);
      expect(filtered[0].id).toBe('6');
    });

    it('combines search and status filters', () => {
      const filtered = filterTodos(mockTodos, {
        searchTerm: 'mom',
        statusFilter: TODO_STATUS.ACTIVE,
      });

      expect(filtered.length).toBe(1);
      expect(filtered[0].id).toBe('3');
      expect(filtered[0].description).toBe('Call Mom');
    });

    it('returns empty array when no matches', () => {
      const filtered = filterTodos(mockTodos, { searchTerm: 'nonexistent' });
      expect(filtered.length).toBe(0);
    });
  });
});
