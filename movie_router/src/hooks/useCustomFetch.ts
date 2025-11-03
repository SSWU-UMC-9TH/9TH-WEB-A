import { useState, useEffect } from "react";
import axios from "axios";
import type { AxiosRequestConfig } from "axios";

export function useCustomFetch<T>(
  url: string,
  options?: AxiosRequestConfig,
  deps: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await axios.get<T>(url, options);
        setData(res.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, deps);

  return { data, loading, error };
}
