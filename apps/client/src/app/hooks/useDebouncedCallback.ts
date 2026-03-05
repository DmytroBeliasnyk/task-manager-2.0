import debounce from 'debounce';
import { useEffect, useMemo } from 'react';

export function useDebouncedCallback<A extends unknown[]>(
  callback: (...args: A) => void,
  delay: number,
): (...args: A) => void {
  const debounced = useMemo(
    () => debounce((...args: A) => callback(...args), delay),
    [callback, delay],
  );

  useEffect(() => {
    return () => debounced.clear();
  }, [debounced]);

  return debounced as (...args: A) => void;
}
