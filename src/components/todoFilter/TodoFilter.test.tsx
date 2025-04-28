import { TODO_STATUS } from '@/lib/constants/todo';
import { render, screen } from '@/lib/test/render';
import { useSearchParams } from 'next/navigation';
import { TodoFilter } from './TodoFilter';

describe('TodoFilter', () => {
  it('renders the filter select', () => {
    render(<TodoFilter />);

    const selectTrigger = screen.getByRole('combobox');
    expect(selectTrigger).toBeInTheDocument();
    expect(selectTrigger).toHaveTextContent('All Tasks');
  });

  it('does not show reset button when filter is set to ALL', () => {
    render(<TodoFilter />);

    const resetButton = screen.queryByText('Reset');
    expect(resetButton).not.toBeInTheDocument();
  });

  it('shows reset button when filter is not ALL', () => {
    vi.mocked(useSearchParams).mockReturnValue({
      get: (param: string) => (param === 'status' ? TODO_STATUS.ACTIVE : null),
      toString: () => 'status=active',
    } as ReturnType<typeof useSearchParams>);

    render(<TodoFilter />);

    const resetButton = screen.getByText('Reset');
    expect(resetButton).toBeInTheDocument();
  });
});
