import { getTodoColumns } from '@/lib/table/todoColumns';
import { render, screen } from '@/lib/test/render';
import type { Todo } from '@/types/todo';
import { DataTable } from './DataTable';

describe('DataTable', () => {
  const mockTodos: Todo[] = [
    {
      id: '1',
      description: 'Complete the project',
      isComplete: false,
      dueDate: '2023-05-20T08:00:00.000Z',
    },
    {
      id: '2',
      description: 'Review code',
      isComplete: true,
      dueDate: '2023-05-15T08:00:00.000Z',
    },
  ];

  const mockToggleTodoCompletion = vi.fn();

  const columns = getTodoColumns({
    onToggle: mockToggleTodoCompletion,
    updatingId: null,
  });

  it('renders the table with data correctly', () => {
    render(<DataTable columns={columns} data={mockTodos} />);

    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Task')).toBeInTheDocument();
    expect(screen.getByText('Due Date')).toBeInTheDocument();

    expect(screen.getByText('Complete the project')).toBeInTheDocument();
    expect(screen.getByText('Review code')).toBeInTheDocument();

    expect(screen.getByText('May 20, 2023')).toBeInTheDocument();
    expect(screen.getByText('May 15, 2023')).toBeInTheDocument();
  });

  it('shows loading state correctly', () => {
    render(<DataTable columns={columns} data={[]} loading={true} />);

    const skeletonElements = screen.getAllByTestId('skeleton');
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  it('shows custom no results message when provided', () => {
    const customMessage = 'No todos found for this search';
    render(
      <DataTable
        columns={columns}
        data={[]}
        noResultsMessage={customMessage}
      />,
    );

    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it('applies custom row class names when provided', () => {
    const getRowClassName = (todo: Todo) => {
      return todo.isComplete ? 'completed-row' : 'active-row';
    };

    render(
      <DataTable
        columns={columns}
        data={mockTodos}
        rowClassName={getRowClassName}
      />,
    );

    // Check that the row classes were applied correctly
    const rows = document.querySelectorAll('tr');

    // First row is the header row
    // Second row should be an active row (not completed)
    expect(rows[1]).toHaveClass('active-row');

    // Third row should be a completed row
    expect(rows[2]).toHaveClass('completed-row');
  });

  it('uses the default no results message when none provided', () => {
    render(<DataTable columns={columns} data={[]} />);

    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });
});
