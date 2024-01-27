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

// 複数のURLに対するデータフェッチを行う
export const useFetchAll = (urls) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await Promise.all(urls.map((url) => fetcher(url)));
        setData(results);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, error, isLoading };
};
