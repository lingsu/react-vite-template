import { useCallback } from "react";
import { useStoreApi } from "./useStore";
import _ from "lodash";
import { RequestOption } from "../utils/request";


const useRequest = (method: string) => {
  const store = useStoreApi();
  // const { showBoundary } = useErrorBoundary();

  const post = useCallback(<T>(url: string, init?: RequestOption) => {
    return store.getState().request<T>(url, {
      method: method,
      apiName:'blade',
      ...init,
    });
    // .catch((error:any) => {
    //   // showBoundary(error);
    //   throw error;
    // });
  }, []);
  return post;
};
const useGetBladeRequest = () => {
  return useRequest("GET");
};
const usePostBladeRequest = () => {
  return useRequest("POST");
};
const useDeleteBladeRequest = () => {
  return useRequest("DELETE");
};
const usePatchBladeRequest = () => {
  return useRequest("PATCH");
};
export {
  useGetBladeRequest,
  usePostBladeRequest,
  useDeleteBladeRequest,
  usePatchBladeRequest,
};
