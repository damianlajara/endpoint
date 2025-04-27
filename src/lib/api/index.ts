import * as todoApi from '@/lib/api/todo';

const apiService = {
  todo: todoApi,
} as const;

export default apiService;
