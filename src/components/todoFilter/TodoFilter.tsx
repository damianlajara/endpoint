'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { STATUS_LABELS, TODO_STATUS } from '@/lib/constants/todo';
import { type TodoStatus } from '@/types/todo';
import { isValidTodoStatus } from '@/utils/todo';
import { removeSearchParams, setSearchParams } from '@/utils/url';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function TodoFilter() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamValue = searchParams.get('status') || TODO_STATUS.ALL;

  const handleValueChange = (value: TodoStatus) => {
    if (isValidTodoStatus(value)) {
      const params = setSearchParams(searchParams, value, 'status');
      replace(`${pathname}?${params}`, { scroll: false });
    }
  };

  const clearFilter = () => {
    const params = removeSearchParams(searchParams, 'status');
    const paramsToReplace = params ? `?${params}` : '';
    replace(`${pathname}${paramsToReplace}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={searchParamValue} onValueChange={handleValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(TODO_STATUS).map((status) => (
            <SelectItem key={status} value={status}>
              {STATUS_LABELS[status]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {searchParamValue !== TODO_STATUS.ALL && (
        <Button onClick={clearFilter} type="button" variant="ghost">
          Reset
        </Button>
      )}
    </div>
  );
}
