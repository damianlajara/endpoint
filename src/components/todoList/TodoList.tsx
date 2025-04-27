'use client';

import { DataTable } from '@/components/dataTable/DataTable';
import { TodoFilter } from '@/components/todoFilter/TodoFilter';
import { TodoSearch } from '@/components/todoSearch/TodoSearch';
import { TodoStat } from '@/components/todoStat/TodoStat';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useFilteredTodos } from '@/hooks/useFilteredTodos';
import { useTodos } from '@/hooks/useTodos';
import { TODO_STATUS } from '@/lib/constants/todo';
import { getTodoColumns } from '@/lib/table/todoColumns';
import { type Todo } from '@/types/todo';
import { isOverdue } from '@/utils/date';
import { ListTodo } from 'lucide-react';
import { ComponentProps, useMemo } from 'react';

export function TodoList() {
  const { todos, loading, error, updatingId, toggleTodoCompletion } =
    useTodos();

  const { filteredTodos, searchTerm, statusFilter } = useFilteredTodos(todos);

  const columns = getTodoColumns({
    onToggle: toggleTodoCompletion,
    updatingId,
  });

  const getRowClassName = (todo: Todo) => {
    if (todo.isComplete) return 'bg-muted/50';
    if (isOverdue(todo.dueDate, todo.isComplete)) return 'bg-destructive/10';
    return '';
  };

  const stats = useMemo(() => {
    const stats: ComponentProps<typeof TodoStat>['stat'][] = [
      {
        title: 'Total Tasks',
        value: todos.length,
      },
      {
        title: 'Total Completed',
        value: todos.filter((todo) => todo.isComplete).length,
      },
      {
        title: 'Total Overdue',
        value: todos.filter((todo) => isOverdue(todo.dueDate, todo.isComplete))
          .length,
        titleClassName: 'text-destructive/85',
      },
    ];
    return stats;
  }, [todos]);

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-bold mx-2 md:mx-4 mb-4 md:mb-8">
        Endpoint Todo App
      </h1>
      <div className="mx-2 sm:mx-4 sm:grid-cols-2 md:grid-cols-3 grid grid-cols-1 gap-4 mb-4 lg:mb-8">
        {stats.map((stat) => (
          <TodoStat key={stat.title} stat={stat} />
        ))}
      </div>
      <Card className="mx-2 sm:mx-4">
        <CardHeader className="pb-3">
          <CardTitle className="inline-flex items-center gap-2">
            <ListTodo className="h-5 w-5" />
            My Todos
          </CardTitle>
          <CardDescription>Manage your tasks efficiently</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <TodoSearch />
            <TodoFilter />
          </div>

          <DataTable
            columns={columns}
            data={filteredTodos}
            loading={loading}
            noResultsMessage={
              searchTerm || statusFilter !== TODO_STATUS.ALL
                ? 'No matching todos found. Try adjusting your filters.'
                : 'No todos found. Add some tasks to get started!'
            }
            rowClassName={getRowClassName}
          />
        </CardContent>
      </Card>
    </div>
  );
}
