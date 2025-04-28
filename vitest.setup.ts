import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

beforeAll(() => {
  vi.stubGlobal('fetch', vi.fn());
  vi.stubEnv('NEXT_PUBLIC_API_KEY', 'test-api-key');
});

afterAll(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    replace: vi.fn(),
    push: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  })),
  useSearchParams: vi.fn(() => ({
    get: vi.fn((param) => {
      if (param === 'search') return '';
      if (param === 'status') return 'all';
      return null;
    }),
    toString: vi.fn(() => ''),
  })),
  usePathname: vi.fn(() => '/'),
}));
