import { useCallback, useEffect, useMemo, useState } from "react";
import { axoisClient } from "../apis/axiosClient";
import type { AxiosRequestConfig, AxiosError } from "axios";

const useFetch = <T>(url: string, options?: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const memoizedOptions = useMemo(() => options, [JSON.stringify(options)]);

  const fetchData = useCallback(
    async (signal?: AbortSignal) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axoisClient.get<T>(url, {
          ...memoizedOptions,
          signal,
        });
        setData(response.data);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;

        const axiosError = err as AxiosError<{ message?: string }>;
        setError(
          axiosError.response?.data?.message ??
            "데이터를 가져오는 중 오류가 발생했습니다."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [url, memoizedOptions]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchData]);

  return {
    data,
    error,
    isLoading,
    refetch: () => fetchData(),
  };
};

export default useFetch;
