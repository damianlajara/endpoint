export const debounce = <T extends unknown[]>(
  cb: (...args: T) => void,
  delay: number = 550,
) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debouncedFunction = (...args: T) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      cb(...args);
    }, delay);
  };

  return debouncedFunction;
};
