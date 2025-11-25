import { useEffect, useRef, useState } from "react";

function useThrottle<T>(value: T, delay: number = 100) {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const now = Date.now();
    const remaining = delay - (now - lastExecuted.current);

    if (remaining <= 0) {
      lastExecuted.current = now;
      setThrottledValue(value);
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      lastExecuted.current = Date.now();
      setThrottledValue(value);
    }, remaining);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value, delay]);

  return throttledValue;
}

export default useThrottle;
