import { render, screen } from '@/lib/test/render';
import { TodoItem } from './TodoItem';

describe('TodoItem', () => {
  it('renders the todo description', () => {
    render(
      <TodoItem
        todo={{
          id: '1',
          description: 'Test Todo',
          isComplete: false,
          dueDate: null,
        }}
      />,
    );

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  it('applies line-through style when todo is complete', () => {
    const { container } = render(
      <TodoItem
        todo={{
          id: '1',
          description: 'Complete Todo',
          isComplete: true,
          dueDate: null,
        }}
      />,
    );

    const todoElement = container.firstChild;
    expect(todoElement).toHaveClass('line-through');
    expect(todoElement).toHaveClass('text-muted-foreground');
  });

  it('does not apply line-through style when todo is incomplete', () => {
    const { container } = render(
      <TodoItem
        todo={{
          id: '1',
          description: 'Incomplete Todo',
          isComplete: false,
          dueDate: null,
        }}
      />,
    );

    const todoElement = container.firstChild;
    expect(todoElement).not.toHaveClass('line-through');
    expect(todoElement).not.toHaveClass('text-muted-foreground');
  });
});
