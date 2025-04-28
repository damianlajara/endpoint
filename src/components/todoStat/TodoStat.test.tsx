import { render, screen } from '@/lib/test/render';
import { TodoStat } from './TodoStat';

describe('TodoStat component', () => {
  it('renders the title and value correctly', () => {
    const stat = {
      title: 'Total Tasks',
      value: 10,
    };

    render(<TodoStat stat={stat} />);

    expect(screen.getByText('Total Tasks')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('applies custom title className when provided', () => {
    const stat = {
      title: 'Overdue Tasks',
      value: 5,
      titleClassName: 'text-destructive/85',
    };

    render(<TodoStat stat={stat} />);

    const titleElement = screen.getByText('5');
    expect(titleElement).toHaveClass('text-destructive/85');
  });
});
