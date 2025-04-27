import { Todo } from '@/types/todo';
import { cn } from '@/utils/styles';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { description, isComplete } = todo;

  return (
    <div
      className={cn(
        'font-medium',
        isComplete && 'line-through text-muted-foreground',
      )}
    >
      {description}
    </div>
  );
}
