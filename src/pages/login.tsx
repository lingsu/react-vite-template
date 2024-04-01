import {
  LockOutlined,
  MobileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  LoginForm,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from "@ant-design/pro-components";
import { message, Tabs } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { md5 } from 'js-md5';
import { Token } from "../andy/typing";
import { useStoreApi } from "../andy/hooks/useStore";
import { usePostBladeRequest } from "../andy/hooks/useBladeRequest";

type LoginType = "phone" | "account";

// const iconStyles: CSSProperties = {
//   marginInlineStart: "16px",
//   color: "rgba(0, 0, 0, 0.2)",
//   fontSize: "24px",
//   verticalAlign: "middle",
//   cursor: "pointer",
// };
const basicKey = window.btoa("saber:saber_secret");

export default () => {
  const [loginType, setLoginType] = useState<LoginType>("account");

  const navigate = useNavigate();
  const store = useStoreApi();
  const { login } = store.getState();
  
  const postRequest = usePostBladeRequest()


  const handleFinish = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const params = new URLSearchParams({
      username,
      password: md5(password),
      // password,
      tenantId: "000000",
    });
    try {
      const data = await postRequest<Token & { error_code: number, error_description: string }>(`/blade-auth/oauth/token`, {
        body: params,
        isTransformResponse:true,
        headers: {
          Authorization: `Basic ${basicKey}`,
        },
      });
      // if (!res.ok) {
      //   throw new Error();
      // }

      // const data = await res.json();
      if (data.error_code === 400) {
        message.error(data.error_description);
        return;
      }

      login(data)
      // setUser(data);
      // localStorage.removeItem("spaceId");
      navigate("/");
    } catch {
      message.error("登录失败");
    }
  };

  return (
    <ProConfigProvider hashed={false}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: '100%'
        }}
      >
        <div 
        // className={css`.ant-pro-form-login-logo{
        //   width: 140px;
        // }`}
        >
          <LoginForm
            logo="/vite.svg"
            // title="管理系统"
            subTitle="管理系统"
            // actions={
            //   <Space>
            //     其他登录方式
            //     <AlipayCircleOutlined style={iconStyles} />
            //     <TaobaoCircleOutlined style={iconStyles} />
            //     <WeiboCircleOutlined style={iconStyles} />
            //   </Space>
            // }
            onFinish={handleFinish}
          >
            <Tabs
              centered
              activeKey={loginType}
              onChange={(activeKey) => setLoginType(activeKey as LoginType)}
            >
              <Tabs.TabPane key={"account"} tab={"账号密码登录"} />
              {/* <Tabs.TabPane key={"phone"} tab={"手机号登录"} /> */}
            </Tabs>
            {loginType === "account" && (
              <>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: "large",
                    prefix: <UserOutlined />,
                  }}
                  rules={[
                    {
                      required: true,
                      message: "请输入用户名!",
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: "large",
                    prefix: <LockOutlined />,
                  }}
                  rules={[
                    {
                      required: true,
                      message: "请输入密码！",
                    },
                  ]}
                />
              </>
            )}
            {loginType === "phone" && (
              <>
                <ProFormText
                  fieldProps={{
                    size: "large",
                    prefix: <MobileOutlined className={"prefixIcon"} />,
                  }}
                  name="mobile"
                  placeholder={"手机号"}
                  rules={[
                    {
                      required: true,
                      message: "请输入手机号！",
                    },
                    {
                      pattern: /^1\d{10}$/,
                      message: "手机号格式错误！",
                    },
                  ]}
                />
                <ProFormCaptcha
                  fieldProps={{
                    size: "large",
                    prefix: <LockOutlined className={"prefixIcon"} />,
                  }}
                  captchaProps={{
                    size: "large",
                  }}
                  placeholder={"请输入验证码"}
                  captchaTextRender={(timing, count) => {
                    if (timing) {
                      return `${count} ${"获取验证码"}`;
                    }
                    return "获取验证码";
                  }}
                  name="captcha"
                  rules={[
                    {
                      required: true,
                      message: "请输入验证码！",
                    },
                  ]}
                  onGetCaptcha={async () => {
                    message.success("获取验证码成功！验证码为：1234");
                  }}
                />
              </>
            )}
            <div
              style={{
                marginBlockEnd: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                自动登录
              </ProFormCheckbox>
              <a
                style={{
                  float: "right",
                }}
              >
                忘记密码
              </a>
            </div>
          </LoginForm>
        </div>
      </div>
    </ProConfigProvider>
  );
};
