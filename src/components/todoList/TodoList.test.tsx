import { useFilteredTodos } from '@/hooks/useFilteredTodos';
import { useTodos } from '@/hooks/useTodos';
import { render, screen } from '@/lib/test/render';
import { TodoList } from './TodoList';

vi.mock('@/hooks/useTodos');
vi.mock('@/hooks/useFilteredTodos');

describe('TodoList component', () => {
  const mockTodos = [
    {
      id: '1',
      description: 'Task 1',
      isComplete: false,
      dueDate: '2030-05-20T00:00:00.000Z',
    },
    {
      id: '2',
      description: 'Task 2',
      isComplete: true,
      dueDate: '2021-05-15T00:00:00.000Z',
    },
    {
      id: '3',
      description: 'Task 3',
      isComplete: false,
      dueDate: '2021-05-15T00:00:00.000Z',
    },
    {
      id: '4',
      description: 'Task 4',
      isComplete: true,
      dueDate: '2022-05-20T00:00:00.000Z',
    },
  ];

  const mockFilteredTodos = [mockTodos[0], mockTodos[2]];
  const mockToggleTodoCompletion = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useTodos).mockReturnValue({
      todos: mockTodos,
      loading: false,
      error: null,
      updatingId: null,
      toggleTodoCompletion: mockToggleTodoCompletion,
      fetchTodos: vi.fn(),
    });

    vi.mocked(useFilteredTodos).mockReturnValue({
      filteredTodos: mockFilteredTodos,
      searchTerm: '',
      statusFilter: 'all',
    });
  });

  it('renders the main heading and card title', () => {
    render(<TodoList />);

    expect(screen.getByText('Endpoint Todo App')).toBeInTheDocument();
    expect(screen.getByText('My Todos')).toBeInTheDocument();
    expect(
      screen.getByText('Manage your tasks efficiently'),
    ).toBeInTheDocument();
  });

  it('renders the TodoStats with correct values', () => {
    render(<TodoList />);

    expect(screen.getByText('Total Tasks')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();

    expect(screen.getByText('Total Completed')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();

    expect(screen.getByText('Total Overdue')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders TodoSearch and TodoFilter components', () => {
    render(<TodoList />);

    const searchInput = screen.getByPlaceholderText('Search todos...');
    const filterSelect = screen.getByRole('combobox');
    expect(searchInput).toBeInTheDocument();
    expect(filterSelect).toBeInTheDocument();
  });

  it('shows error alert when there is an error', () => {
    vi.mocked(useTodos).mockReturnValue({
      todos: mockTodos,
      loading: false,
      error: 'Failed to fetch todos',
      updatingId: null,
      toggleTodoCompletion: mockToggleTodoCompletion,
      fetchTodos: vi.fn(),
    });

    render(<TodoList />);

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Failed to fetch todos')).toBeInTheDocument();
  });

  it('shows custom no results message with filters', () => {
    vi.mocked(useFilteredTodos).mockReturnValue({
      filteredTodos: [],
      searchTerm: 'nonexistent',
      statusFilter: 'active',
    });

    render(<TodoList />);

    expect(
      screen.getByText('No matching todos found. Try adjusting your filters.'),
    ).toBeInTheDocument();
  });

  it('shows default no results message without filters', () => {
    vi.mocked(useFilteredTodos).mockReturnValue({
      filteredTodos: [],
      searchTerm: '',
      statusFilter: 'all',
    });

    render(<TodoList />);

    expect(
      screen.getByText('No todos found. Add some tasks to get started!'),
    ).toBeInTheDocument();
  });
});
