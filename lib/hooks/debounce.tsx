import { useState, useEffect } from "react";

// Debounce hook
export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer); // Cleanup timeout on value change
  }, [value, delay]);

  return debouncedValue;
}
