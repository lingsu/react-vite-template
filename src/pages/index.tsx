import {
  DatabaseOutlined,
  HomeOutlined,
  LogoutOutlined,
  ProjectOutlined,
  ShareAltOutlined,
  UserOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import { ProLayoutProps, ProLayout } from "@ant-design/pro-components";
import { Navigate, Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { Dropdown } from "antd";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { useStore, useStoreApi } from "../andy/hooks/useStore";
// import ErrorBoundary from "../components/ErrorBoundary";

// const Notification = () => {
//   const [open, setOpen] = useState(false);

//   const showDrawer = () => {
//     setOpen(true);
//   };

//   const onClose = () => {
//     setOpen(false);
//   };

//   return (
//     <>
//       <BellOutlined onClick={showDrawer} />
//       <Drawer
//         title="消息通知"
//         placement="right"
//         onClose={onClose}
//         open={open}
//       ></Drawer>
//     </>
//   );
// };

// async function fetchUser(token: string) {
//   const res = await fetch(`${VITE_API_BASE_URL}/blade-user/info`, {
//       headers: {
//           "Blade-Auth": token
//       },
//   })
//   const { data } = await res.json()
//   return data
// }

const routeDic: Record<string, ProLayoutProps["route"]> = {
  '超级管理员': {
    children: [
      {
        icon: <HomeOutlined />,
        path: "/",
        name: "首页",
      },
      {
        icon: <ProjectOutlined />,
        path: "project",
        name: "项目",
      },
      {
        icon: <DatabaseOutlined />,
        path: "dataset",
        name: "数据集",
      },
      {
        icon: <WechatOutlined />,
        path: "discussion",
        name: "讨论区",
      },
      {
        icon: <ShareAltOutlined />,
        path: "admin",
        name: "系统管理",
        children: [
          {
            path: "teacher",
            name: "教师管理",
          },
          {
            path: "class",
            name: "班级管理",
          },
          {
            path: "student",
            name: "学生管理",
          },
          {
            path: "user",
            name: "用户管理",
          },
        ],
      },
      // {
      //   icon: <DashboardOutlined />,
      //   path: "about",
      //   name: "数据看板",
      // },
    ],
  },
  '教师': {
    children: [
      {
        icon: <HomeOutlined />,
        path: "/",
        name: "首页",
      },
      {
        icon: <ProjectOutlined />,
        path: "project",
        name: "项目",
      },
      {
        icon: <DatabaseOutlined />,
        path: "dataset",
        name: "数据集",
      },
      {
        icon: <WechatOutlined />,
        path: "discussion",
        name: "讨论区",
      },
      {
        icon: <ShareAltOutlined />,
        path: "admin",
        name: "系统管理",
        children: [
          {
            path: "class",
            name: "班级管理",
          },
          // {
          //   path: "student",
          //   name: "学生管理",
          // },
        ],
      },
      // {
      //   icon: <DashboardOutlined />,
      //   path: "about",
      //   name: "数据看板",
      // },
    ],
  },
};

export default () => {
  const location = useLocation();
  const navigate = useNavigate();
  const store = useStoreApi();
  const { user, isLogin } = useStore(
    useShallow((state) => ({ user: state.user, isLogin: state.isLogin }))
  );

  useEffect(() => {
    if (isLogin) {
      store.getState().getUserInfo();
    }
  }, [isLogin]);
  if (!isLogin) {
    return <Navigate to="/login" replace={true} />;
  }

  if (!user) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        加载中...
      </div>
    );
  }

  const route: ProLayoutProps["route"] = routeDic[user.roleName] ?? {
    children: [
      {
        icon: <HomeOutlined />,
        path: "/",
        name: "首页",
      },
      {
        icon: <ProjectOutlined />,
        path: "project",
        name: "项目",
      },
      {
        icon: <DatabaseOutlined />,
        path: "dataset",
        name: "数据集",
      },
      {
        icon: <WechatOutlined />,
        path: "discussion",
        name: "讨论区",
      },
    ],
  };
  return (
    <ProLayout
      layout="top"
      token={{
        header: {
          // colorBgMenuItemSelected: "rgba(0,0,0,0.04)",
          colorBgMenuItemSelected: "#84B63F",
          colorTextMenuSelected: "white",
        },
      }}
      route={route}
      location={location}
      //  menuProps={{
      //   onSelect(info: any) {
      //     // navigate(info.key);
      //     console.log('onSelect',info)
      //   },
      // }}
      menuItemRender={(item, dom) => (
        <div
          onClick={() => {
            navigate(item.path || "/");
          }}
        >
          {dom}
        </div>
      )}
      menuProps={{
        // mode:'inline'
        style: { marginLeft: 10 },
        // onSelect(info: any) {
        //   navigate(info.key);
        // },
      }}
      title={import.meta.env.VITE_APP_TITLE}
      logo="/zltech_logo.png"
      // avatarProps={{
      //   src:
      //     user.avatar ||
      //     "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/BiazfanxmamNRoxxVxka.png",
      //   size: "small",
      //   title: user.nick_name,
      //   render: (_, dom) => {
      //     return <UserInfoDropdown>{dom}</UserInfoDropdown>;
      //   },
      // }}

      // actionsRender={() => {
      //   return [<Notification key="bell" />];
      // }}
      avatarProps={{
        src:
          user.avatar ||
          "/assets/BiazfanxmamNRoxxVxka.png",
        size: "small",
        title: user?.realName,
        render: (_, dom) => {
          // console.log("props", props);
          return (
            <Dropdown
              menu={{
                items: [
                  {
                    key: "profile",
                    icon: <UserOutlined />,
                    label: "个人中心",
                    onClick: () => {
                      navigate("/user/profile");
                    },
                  },
                  {
                    key: "logout",
                    icon: <LogoutOutlined />,
                    label: "退出登录",
                    onClick: () => {
                      navigate("/login");
                    },
                  },
                ],
              }}
            >
              {dom}
            </Dropdown>
          );
        },
      }}
    >
      {/* <ErrorBoundary resetKeys={[location.pathname]}> */}
      <Outlet />
      {/* </ErrorBoundary> */}
    </ProLayout>
  );
};
