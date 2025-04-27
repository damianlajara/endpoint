'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { debounce } from '@/utils/throttle';
import {
  getSearchParamValue,
  removeSearchParams,
  setSearchParams,
} from '@/utils/url';
import { Search, X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';

export function TodoSearch() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamValue = getSearchParamValue(searchParams);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = setSearchParams(searchParams, value);
    replace(`${pathname}?${params}`, { scroll: false });
  };

  const clearSearch = () => {
    const params = removeSearchParams(searchParams, 'search');
    const paramsToReplace = params ? `?${params}` : '';
    replace(`${pathname}${paramsToReplace}`, { scroll: false });
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search todos..."
        onChange={debounce(handleSearch)}
        defaultValue={searchParamValue}
        className="pl-9 pr-10"
        ref={inputRef}
      />
      {searchParamValue && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute group right-0 top-0 bottom-0 rounded-l-none hover:bg-transparent"
          onClick={clearSearch}
          type="button"
          aria-label="Clear search"
        >
          <X className="h-4 w-4 group-hover:text-muted-foreground" />
        </Button>
      )}
    </div>
  );
}
