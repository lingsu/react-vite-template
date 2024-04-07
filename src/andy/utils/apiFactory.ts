import request, { RequestOption } from "./request";

class ApiFactory {
    api: Record<string, typeof request> = {
      default: (url: string, init?: RequestOption) =>
        request(url, { baseUrl: import.meta.env.VITE_API_BASE_URL, ...init }),
    };
    getRequest(name?: string) {
      return this.api[name || "default"] || this.api.default;
    }
  }
  
  let api = new ApiFactory();
  export default api;