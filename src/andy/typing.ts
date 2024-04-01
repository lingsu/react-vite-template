import { Dayjs } from "dayjs";
import { RequestOption } from "./utils/request";

export type User = {
  id: string;
  createUser: string;
  createDept: string;
  createTime: string;
  updateUser: string;
  updateTime: string;
  status: number;
  isDeleted: number;
  tenantId: string;
  code: string;
  userType: number;
  account: string;
  name: string;
  realName: string;
  avatar: string;
  email: string;
  phone: string;
  birthday: string;
  sex: number;
  roleId: string;
  deptId: string;
  postId: string;
  newLogin: string;
  oldLogin: string;
  projectNum: number;
  modelNum: number;
  tenantName: string;
  userTypeName: string;
  roleName: string;
  deptName: string;
  postName: string;
  sexName: string;
  userExt: string;
};

export type Token = {
  tenant_id: string;
  user_id: string;
  dept_id: string;
  post_id: string;
  role_id: string;
  oauth_id: string;
  account: string;
  user_name: string;
  nick_name: string;
  role_name: string;
  avatar: string;
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  license: string;
};

export type AndyStore = {
  user: User | null;
  api: Record<string, string>;
  token: Token | null;
  aiToken: string;
  isLogin: boolean;
  loginTime: Dayjs | null;
};

export type AndyRequestOption = RequestOption & {
  apiName?: string;
};
export type AndyStoreActions = {
  setUser: (user: User) => void;
  setToken: (token: Token | null) => void;
  login: (token: Token) => void;
  setIsLogin: (login: boolean) => void;
  getUserInfo: () => void;
  logout: () => void;
  download: (url: string) => void;
  request: <T>(url: string, option?: AndyRequestOption) => Promise<T>;
};
export type AppState = AndyStore & AndyStoreActions;

export type BladePageWrap<T> = {
  records: T[];
  total: number;
  size?: number;
  current: number;
  orders?: any[];
  optimizeCountSql?: boolean;
  searchCount?: boolean;
  countId?: string;
  maxLimit?: number;
  pages?: number;
};

export type BladeAttach = {
  link: string;
  domain: string;
  name: string;
  originalName: string;
  attachId: number;
};
