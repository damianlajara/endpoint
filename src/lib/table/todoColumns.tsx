import { TodoItem } from '@/components/todoItem/TodoItem';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Todo } from '@/types/todo';
import { formatDate, isOverdue } from '@/utils/date';
import { ColumnDef } from '@tanstack/react-table';
import { Loader2 } from 'lucide-react';

interface TodoColumnsOptions {
  onToggle: (todoId: string, isComplete: boolean) => Promise<void>;
  updatingId?: string | null;
}

export function getTodoColumns(options: TodoColumnsOptions): ColumnDef<Todo>[] {
  const { onToggle, updatingId = null } = options;

  return [
    {
      accessorKey: 'isComplete',
      header: 'Status',
      cell: ({ row }) => (
        <div className="flex justify-center">
          {updatingId === row.original.id ? (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : (
            <Checkbox
              className="hover:border-slate-300"
              checked={row.original.isComplete}
              onCheckedChange={(checked) => {
                onToggle(row.original.id, !!checked);
              }}
              aria-label={
                row.original.isComplete
                  ? 'Mark as incomplete'
                  : 'Mark as complete'
              }
            />
          )}
        </div>
      ),
      size: 70,
    },
    {
      accessorKey: 'description',
      header: 'Task',
      cell: ({ row }) => <TodoItem todo={row.original} />,
    },
    {
      accessorKey: 'dueDate',
      header: 'Due Date',
      cell: ({ row }) => {
        const { dueDate, isComplete } = row.original;

        if (!dueDate)
          return <span className="text-muted-foreground">No due date</span>;

        const todoIsOverdue = isOverdue(dueDate, isComplete);

        return (
          <div
            className={
              todoIsOverdue
                ? 'text-destructive font-medium'
                : 'text-muted-foreground'
            }
          >
            {formatDate(dueDate)}
            {todoIsOverdue && (
              <Badge
                variant="destructive"
                className="ml-2 md:ml-4 rounded-2xl border-0"
              >
                OVERDUE!
              </Badge>
            )}
          </div>
        );
      },
      size: 150,
    },
  ];
}
