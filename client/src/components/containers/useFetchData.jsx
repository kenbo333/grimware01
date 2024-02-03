import useSWR from "swr";
import { apiClient } from "../../../lib/apiClient";
import { useEffect, useState } from "react";

const fetcher = async (url) => {
  const response = await apiClient.get(url);
  return response.data;
};

// 単一のURLに対するデータフェッチを行う
export const useFetch = (url) => {
  const { data, error, isLoading } = useSWR(url, fetcher);
  return { data, error, isLoading };
};
// if (error) return <div>failed to load</div>;
// if (isLoading) return <div>loading...</div>;

// 複数のURLに対するデータフェッチを行う
export const useFetchAll = (urls) => {
  const { data, error } = useSWR(urls, () =>
    Promise.all(urls.map((url) => fetcher(url)))
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
  // if (isError) return <div>failed to load</div>;
  // if (isLoading) return <div>loading...</div>;
};
