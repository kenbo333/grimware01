import useSWR from "swr";
import { apiClient } from "../../../lib/apiClient";

const fetcher = async (url) => {
  const response = await apiClient.get(url);
  // console.log("api取得");
  return response.data;
};

// 単一のURLに対するデータフェッチを行う
export const useFetchSingle = (url) => {
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);
  return { data, error, isLoading, mutate };
};
// const { data, error, isLoading, mutate } = useFetchSingle();
// if (error) return <div>failed to load</div>;
// if (isLoading) return <div>loading...</div>;

// 複数のURLに対するデータフェッチを行う
export const useFetchMulti = (urls) => {
  const { data, error, mutate } = useSWR(urls, () =>
    Promise.all(urls.map((url) => fetcher(url)))
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
  // const { data, isLoading, isError } = useFetchMulti(urls);
  // if (isError) return <div>failed to load</div>;
  // if (isLoading) return <div>loading...</div>;
  // const [] = data;
};
