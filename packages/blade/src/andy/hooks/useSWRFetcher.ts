import useSWR from "swr";
import { useGetRequest } from "./useRequest";
import useSWRImmutable from "swr/immutable";

export const useSWRImmutableFetcher = <T = any>(key: any) => {
  const fetcher = useGetRequest();
  // const swr= useSWR<T>(key, fetcher);
  return useSWRImmutable<T>(key, fetcher);
};

export default <T = any>(key: any) => {
  const fetcher = useGetRequest();
  // const swr= useSWR<T>(key, fetcher);
  return useSWR<T>(key, fetcher);
};