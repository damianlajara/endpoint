import { TodoList } from '@/components/todoList/TodoList';

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start container mx-auto py-10">
        <TodoList />
      </main>
    </div>
  );
}
