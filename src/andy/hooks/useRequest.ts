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
      apiName: "default",
      ...init,
    });
    // .catch((error:any) => {
    //   // showBoundary(error);
    //   throw error;
    // });
  }, []);
  return post;
};
const useGetRequest = () => {
  return useRequest("GET");
};
const usePostRequest = () => {
  return useRequest("POST");
};
const useDeleteRequest = () => {
  return useRequest("DELETE");
};
const usePatchRequest = () => {
  return useRequest("PATCH");
};
export { useGetRequest, usePostRequest, useDeleteRequest, usePatchRequest };
