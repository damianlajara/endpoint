import { type Todo } from './todo';

export type TodoColumn = {
  id: keyof Todo;
  label: string;
  width?: number;
};
