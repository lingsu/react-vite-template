import request, { RequestOption } from "./request";
import requestBlade from "./requestBlade";

class ApiFactory {
    api: Record<string, typeof request> = {
      default: (url: string, init?: RequestOption) =>
        request(url, { baseUrl: import.meta.env.VITE_API_BASE_URL, ...init }),
      blade: (url: string, init?: RequestOption) =>
        requestBlade(url, {
          baseUrl: import.meta.env.VITE_BLADE_API_BASE_URL,
          ...init,
        }),
    };
    getRequest(name?: string) {
      return this.api[name || "default"];
    }
  }
  
  let api = new ApiFactory();
  export default api;