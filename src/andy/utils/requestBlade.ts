import _ from "lodash";
import { RequestOption } from "./request";


const request = async <T>(url: string, init?: RequestOption) => {
  var {
    withToken,
    isReturnNativeResponse,
    isTransformResponse,
    token,
    baseUrl,
    ...requestInit
  } = init ?? { baseUrl: "" };

  if (token && withToken !== false) {
    // requestInit.headers!["Authorization"] = `Basic ${basicKey}`;

    if (!requestInit.headers) {
      requestInit.headers = {};
    }
    (requestInit.headers as any)["Blade-Auth"] = `${token}`;
  }

  // const res = await fetch(`${VITE_API_BASE_URL}${url}`, requestInit);
  // if (!res.ok) {
  //   throw new HttpError(res);
  // }
  // if (option.isReturnNativeResponse) {
  //   return res;
  // }
  // const data = await res.json();

  // if (option.isTransformResponse) {
  //   return data;
  // }
  // const { code, msg, success } = data;
  // if (code === 200) {
  //   return data.data;
  // }
  // throw new HttpError(res);

  var res = await fetch(`${baseUrl}${url}`, requestInit);

  if (!res.ok) {

    let message = '服务异常';

    try {
      const json = await res.json();
      message = json.msg;
    } catch  {
      
    }

    throw new Error(message);
  }

  const json = await res.json();
  if (isTransformResponse) {
    return json as T;
  }
  const { data, success,msg } = json as any;
  if (!success) {
    throw new Error(msg)
  }

  return data as T;

  // if (res.status === 500) {
  //   const error: any = new Error("服务器维护中，请稍后再试.");
  //   // 将额外的信息附加到错误对象上。
  //   error.status = res.status;
  //   error.name = "ApiError";
  //   throw error;
  // }
  // // console.log('res',res)
  // const data = await res.json();

  // const { msg, success } = data;
  // if (success) {
  //   return data.data as T;
  // }

  // const message =
  // msg || (data.info && data.info.message && _.values(data.info.message).join("")) ||
  //   "请求异常.";

  // const error: any = new Error(message);
  // // 将额外的信息附加到错误对象上。
  // error.name = "ApiError";
  // error.info = data;
  // error.status = res.status;
  // throw error;
  return (await res.json()) as T;
};
export default request;
