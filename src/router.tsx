import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "dayjs/locale/zh-cn";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import routes from "./routes";

const router = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_BASENAME,
});

export default () => {
  return (
    <ConfigProvider
      // theme={{
      //   components: {
      //     Menu: {
      //       itemSelectedBg: "#84B63F22",
      //       itemHoverBg: "#84B63F22",
      //       itemActiveBg: "#84B63F22",
      //     },
      //   },
      //   token: {
      //     // Seed Token，影响范围大
      //     colorPrimary: "#84B63F",
      //     // borderRadius: 2,

      //     // // 派生变量，影响范围小
      //     // colorBgContainer: "#f6ffed",
      //   },
      // }}
      locale={zhCN}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};
