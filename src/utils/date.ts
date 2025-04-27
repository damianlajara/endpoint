import { format, isPast, parseISO } from 'date-fns';

export function formatDate(date: string | null): string {
  if (!date) return '';
  return format(parseISO(date), 'MMM d, yyyy');
}

// Check if a date is in the past
export function isOverdue(date: string | null, isComplete: boolean): boolean {
  if (!date || isComplete) return false;
  return isPast(parseISO(date));
}
