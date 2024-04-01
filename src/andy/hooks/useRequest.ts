import { useCallback } from "react";
import { useStoreApi } from "./useStore";
import _ from "lodash";
import request, { RequestOption } from "../utils/request";

const replaceUrl = (url: string, kv: Record<string, any>) => {
  _.keysIn(kv).forEach((key) => {
    if (kv[key]) {
      url = url.replace(`{${key}}`, kv[key]);
    }
  });
  return url;
};
const useRequest = (method: string) => {
  const store = useStoreApi();
  // const { showBoundary } = useErrorBoundary();

  const post = useCallback(<T>(url: string, init?: RequestOption) => {
    const { aiToken, api, user } = store.getState();
    return request<T>(replaceUrl(url, { user_id: user?.id }), {
      method: method,
      token: aiToken,
      baseUrl: api['default'],
      ...init,
    });
    // .catch((error:any) => {
    //   // showBoundary(error);
    //   throw error;
    // });
  }, []);
  return post;
}
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
export { useGetRequest,usePostRequest,useDeleteRequest,usePatchRequest };
