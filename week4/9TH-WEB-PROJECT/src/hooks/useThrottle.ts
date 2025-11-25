import { useState, useEffect, useRef } from 'react';

function useThrottle<T>(value: T, interval: number = 1000): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastUpdateTimeRef = useRef<number>(Date.now());
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timeSinceLastUpdate = Date.now() - lastUpdateTimeRef.current;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (timeSinceLastUpdate >= interval) {
      lastUpdateTimeRef.current = Date.now();
      setThrottledValue(value);
    } else {
      timeoutRef.current = setTimeout(() => {
        lastUpdateTimeRef.current = Date.now();
        setThrottledValue(value);
        timeoutRef.current = null;
      }, interval - timeSinceLastUpdate);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, interval]);

  return throttledValue;
}

export default useThrottle;