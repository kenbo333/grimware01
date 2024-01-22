import useSWR from "swr";
import { apiClient } from "../../../lib/apiClient";

const fetcher = async (url) => {
  const response = await apiClient.get(url);
  return response.data;
};

export const useFetch = (url) => {
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
  };
};
