import { AndyStore } from "../typing";

const initialState: AndyStore = {
  user: null,
  api: {
    default: import.meta.env.VITE_API_BASE_URL,
    blade: import.meta.env.VITE_BLADE_API_BASE_URL,
  },
  aiToken: "2f68dbbf-519d-4f01-9636-e2421b68f379",
  isLogin:false,
  token: null,
  loginTime: null,
};
export default initialState;
