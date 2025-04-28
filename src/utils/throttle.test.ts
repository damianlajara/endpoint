import { debounce } from './throttle';

describe('debounce utility', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should delay function execution by the specified time', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn();

    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should reset the timer when called again before executing', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn();

    vi.advanceTimersByTime(50);

    // Call again - this should reset the timer
    debouncedFn();

    // Advance time to what would have been the first call's execution
    vi.advanceTimersByTime(50);
    expect(mockFn).not.toHaveBeenCalled(); // First call should be cancelled

    // Advance more time to hit the second call's execution
    vi.advanceTimersByTime(50);
    expect(mockFn).toHaveBeenCalledTimes(1); // Second call should execute
  });

  it('should use the default delay if none is specified', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn);

    debouncedFn();

    vi.advanceTimersByTime(500);
    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should pass arguments correctly to the callback', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn('test', 123, { key: 'value' });

    vi.advanceTimersByTime(100);

    expect(mockFn).toHaveBeenCalledWith('test', 123, { key: 'value' });
  });

  it('should handle multiple calls with different arguments', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn('first call');
    vi.advanceTimersByTime(50);

    debouncedFn('second call');
    vi.advanceTimersByTime(100);

    // Only the second call should be executed with its arguments
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('second call');
  });
});
