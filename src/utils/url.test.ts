import { TODO_STATUS } from '@/lib/constants/todo';
import { ReadonlyURLSearchParams } from 'next/navigation';
import {
  getSearchParamValue,
  getStatusFilterParamValue,
  removeSearchParams,
  setSearchParams,
} from './url';

describe('url utils', () => {
  describe('removeSearchParams', () => {
    it('removes a parameter from the URL search params', () => {
      const searchParams = new URLSearchParams(
        'search=test&status=active',
      ) as ReadonlyURLSearchParams;
      const result = removeSearchParams(searchParams, 'search');

      expect(result).toBe('status=active');
    });

    it('returns an empty string if removing the only parameter', () => {
      const searchParams = new URLSearchParams(
        'search=test',
      ) as ReadonlyURLSearchParams;
      const result = removeSearchParams(searchParams, 'search');

      expect(result).toBe('');
    });

    it('handles non-existent parameters', () => {
      const searchParams = new URLSearchParams(
        'search=test',
      ) as ReadonlyURLSearchParams;
      const result = removeSearchParams(searchParams, 'nonexistent');

      expect(result).toBe('search=test');
    });
  });

  describe('setSearchParams', () => {
    it('sets a search parameter with a new value', () => {
      const searchParams = new URLSearchParams(
        'status=active',
      ) as ReadonlyURLSearchParams;
      const result = setSearchParams(searchParams, 'test');

      expect(result).toBe('status=active&search=test');
    });

    it('sets a search parameter with a custom key', () => {
      const searchParams = new URLSearchParams(
        'search=test',
      ) as ReadonlyURLSearchParams;
      const result = setSearchParams(searchParams, 'active', 'status');

      expect(result).toBe('search=test&status=active');
    });

    it('updates an existing parameter', () => {
      const searchParams = new URLSearchParams(
        'search=old',
      ) as ReadonlyURLSearchParams;
      const result = setSearchParams(searchParams, 'new');

      expect(result).toBe('search=new');
    });

    it('removes the parameter if value is empty', () => {
      const searchParams = new URLSearchParams(
        'search=test&status=active',
      ) as ReadonlyURLSearchParams;
      const result = setSearchParams(searchParams, '');

      expect(result).toBe('status=active');
    });
  });

  describe('getSearchParamValue', () => {
    it('returns the search parameter value', () => {
      const searchParams = new URLSearchParams(
        'search=test',
      ) as ReadonlyURLSearchParams;
      const result = getSearchParamValue(searchParams);

      expect(result).toBe('test');
    });

    it('returns an empty string if parameter does not exist', () => {
      const searchParams = new URLSearchParams(
        'status=active',
      ) as ReadonlyURLSearchParams;
      const result = getSearchParamValue(searchParams);

      expect(result).toBe('');
    });
  });

  describe('getStatusFilterParamValue', () => {
    it('returns the status parameter value', () => {
      const searchParams = new URLSearchParams(
        'status=active',
      ) as ReadonlyURLSearchParams;
      const result = getStatusFilterParamValue(searchParams);

      expect(result).toBe('active');
    });

    it('returns ALL status if parameter does not exist', () => {
      const searchParams = new URLSearchParams(
        'search=test',
      ) as ReadonlyURLSearchParams;
      const result = getStatusFilterParamValue(searchParams);

      expect(result).toBe(TODO_STATUS.ALL);
    });
  });
});
