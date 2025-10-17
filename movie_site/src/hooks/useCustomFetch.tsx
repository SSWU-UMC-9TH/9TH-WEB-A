import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import { useState, useEffect } from "react";

type FetchState<T> = {
  data: T | null;
  isPending: boolean;
  isError: boolean;
};

export function useCustomFetch<T>(
  requests: AxiosRequestConfig[],
  deps: any[] = []
): FetchState<T[]> {
  const [data, setData] = useState<T[] | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      setIsError(false);

      try {
        const responses = await Promise.all(requests.map(req => axios(req)));
        setData(responses.map(res => res.data));
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, deps);

  return { data, isPending, isError };
}