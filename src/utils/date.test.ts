import { addDays, subDays } from 'date-fns';
import { formatDate, isOverdue } from './date';

describe('Date utilities', () => {
  describe('formatDate', () => {
    it('formats a date string correctly', () => {
      const dateString = '2023-05-15T12:00:00.000Z';
      expect(formatDate(dateString)).toBe('May 15, 2023');
    });

    it('returns an empty string for null date', () => {
      expect(formatDate(null)).toBe('');
    });
  });

  describe('isOverdue', () => {
    it('returns true for past dates with incomplete todos', () => {
      // Create a date in the past
      const pastDate = subDays(new Date(), 5).toISOString();
      expect(isOverdue(pastDate, false)).toBe(true);
    });

    it('returns false for future dates', () => {
      // Create a date in the future
      const futureDate = addDays(new Date(), 5).toISOString();
      expect(isOverdue(futureDate, false)).toBe(false);
    });

    it('returns false for null dates', () => {
      expect(isOverdue(null, false)).toBe(false);
    });

    it('returns false for completed todos regardless of date', () => {
      // Even with a past date, completed todos are not overdue
      const pastDate = subDays(new Date(), 5).toISOString();
      expect(isOverdue(pastDate, true)).toBe(false);
    });
  });
});
