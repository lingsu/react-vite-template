import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { useStoreApi } from "./useStore";

export const useSWRImmutableFetcher = <T = any>(key: any) => {

  const store = useStoreApi();

  
  // const swr= useSWR<T>(key, fetcher);
  return useSWRImmutable<T>(key, (url) => store.getState().request<T>(url as any, {apiName:'blade'}));
};

export default <T = any>(key: any) => {
  const store = useStoreApi();
  // const swr= useSWR<T>(key, fetcher);
  return useSWR<T>(key, (url) => store.getState().request<T>(url as any, {apiName:'blade'}));
};