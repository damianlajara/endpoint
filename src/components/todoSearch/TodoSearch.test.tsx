import { render, screen } from '@/lib/test/render';
import { useSearchParams } from 'next/navigation';
import { TodoSearch } from './TodoSearch';

describe('TodoSearch', () => {
  it('renders the search input', () => {
    render(<TodoSearch />);

    expect(screen.getByPlaceholderText('Search todos...')).toBeInTheDocument();
  });

  it('shows the search icon', () => {
    render(<TodoSearch />);

    const searchIcon = document.querySelector('svg');
    expect(searchIcon).toBeInTheDocument();
  });

  it('does not show the clear button if search is empty', () => {
    render(<TodoSearch />);

    const clearButton = screen.queryByLabelText('Clear search');
    expect(clearButton).not.toBeInTheDocument();
  });

  it('shows the clear button when there is a search value', () => {
    vi.mocked(useSearchParams).mockReturnValue({
      get: (param: string) => (param === 'search' ? 'test' : null),
      toString: () => 'search=test',
    } as ReturnType<typeof useSearchParams>);

    render(<TodoSearch />);

    const clearButton = screen.getByLabelText('Clear search');
    expect(clearButton).toBeInTheDocument();
  });
});
