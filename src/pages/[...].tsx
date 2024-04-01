import { Result } from "antd";
import type { FC } from "react";
import { Link } from "react-router-dom";

const Component: FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="对不起，您访问的页面不存在。"
      extra={<Link to="/">返回首页</Link>}
    />
  );
};

export default Component;
