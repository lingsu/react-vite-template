import { AndyStore } from "../typing";

const initialState: AndyStore = {
  user: null,
  api: {
    default: import.meta.env.VITE_API_BASE_URL,
  },
  isLogin:false,
  token: null,
  loginTime: null,
};
export default initialState;
