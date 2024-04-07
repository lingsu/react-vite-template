import {
  ModalForm,
  PageContainer,
  ProForm,
  ProFormCaptcha,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Card, Flex, Form, List, Menu, Upload, message } from "antd";
import { useMemo, useState } from "react";
import { MailTwoTone, UploadOutlined } from "@ant-design/icons";
import { md5 } from "js-md5";
import { useStore, useStoreApi } from "../../../../andy/hooks/useStore";
// import md5 from "md5";
import avatar from "../../../../assets/avatar.png";
import { BladeAttach } from "../../../../andy/typing";

const { Item } = Menu;

const passwordStrength = {
  strong: <span className="strong">强</span>,
  medium: <span className="medium">中</span>,
  weak: <span className="weak">弱 Weak</span>,
};

// function geTel(tel: string) {
//   if (tel && tel.length > 7) {
//     return tel.substring(0, 3) + '****' + tel.substr(tel.length - 4);
//   }
//   return tel;
// }

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
export const BindPhone = () => {
  const [form] = Form.useForm<{ name: string; company: string }>();
  // const captchaRef = useRef<CaptFieldRef | null | undefined>();
  // const inputRef = useRef();

  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title="绑定手机"
      trigger={<a>绑定</a>}
      form={form}
      autoFocusFirstInput
      modalProps={{
        width: 400,
        destroyOnClose: true,
        onCancel: () => console.log("run"),
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values.name);
        message.success("提交成功");
        return true;
      }}
    >
      <ProFormText
        name="phone"
        fieldProps={{
          size: "large",
        }}
        rules={[
          { required: true, message: "请输入手机号" },
          { pattern: /^1[3456789]\d{9}$/, message: "请输入正确的手机号" },
        ]}
        placeholder="请输入手机号"
      />
      <ProFormCaptcha
        fieldProps={{
          size: "large",
          prefix: <MailTwoTone />,
        }}
        captchaProps={{
          size: "large",
        }}
        // 手机号的 name，onGetCaptcha 会注入这个值
        phoneName="phone"
        name="captcha"
        rules={[
          {
            required: true,
            message: "请输入验证码",
          },
        ]}
        placeholder="请输入验证码"
        // 如果需要失败可以 throw 一个错误出来，onGetCaptcha 会自动停止
        // throw new Error("获取验证码错误")
        onGetCaptcha={async (phone) => {
          console.log("phone", phone);
          await waitTime(1000);
          message.success(`验证码已发送!`);
        }}
      />
    </ModalForm>
  );
};
export const BindEmail = () => {
  const [form] = Form.useForm<{ name: string; company: string }>();
  // const captchaRef = useRef<CaptFieldRef | null | undefined>();
  // const inputRef = useRef();

  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title="绑定邮箱"
      trigger={<a>绑定</a>}
      form={form}
      autoFocusFirstInput
      modalProps={{
        width: 400,
        destroyOnClose: true,
        onCancel: () => console.log("run"),
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values.name);
        message.success("提交成功");
        return true;
      }}
    >
      <ProFormText
        name="phone"
        fieldProps={{
          size: "large",
        }}
        rules={[
          { required: true, message: "请输入邮箱" },
          {
            pattern: /^([\w]+\.*)([\w]+)@[\w]+\.\w{3}(\.\w{2}|)$/,
            message: "请输入正确的邮箱",
          },
        ]}
        placeholder="请输入邮箱"
      />
      <ProFormCaptcha
        fieldProps={{
          size: "large",
          prefix: <MailTwoTone />,
        }}
        captchaProps={{
          size: "large",
        }}
        // 手机号的 name，onGetCaptcha 会注入这个值
        phoneName="phone"
        name="captcha"
        rules={[
          {
            required: true,
            message: "请输入验证码",
          },
        ]}
        placeholder="请输入验证码"
        // 如果需要失败可以 throw 一个错误出来，onGetCaptcha 会自动停止
        // throw new Error("获取验证码错误")
        onGetCaptcha={async (phone) => {
          console.log("phone", phone);
          await waitTime(1000);
          message.success(`验证码已发送!`);
        }}
      />
    </ModalForm>
  );
};
const SecurityView: React.FC = () => {
  const store = useStoreApi();

  const [modalVisit, setModalVisit] = useState(false);
  //   const bladeApi = useReactBlade();

  //   const [currentUserInfo] = useUserInfo();
  const currentUserInfo: any = {};

  //   var phone = geTel(currentUserInfo?.phone ?? '');

  const getData = () => [
    {
      title: "账户密码",
      description: (
        <>
          当前密码强度：
          {passwordStrength.strong}
        </>
      ),
      actions: [
        <a
          key="Modify"
          onClick={() => {
            setModalVisit(true);
          }}
        >
          修改
        </a>,
      ],
    },
    // {
    //   title: "密保手机",
    //   description: `未绑定手机`,
    //   actions: [<BindPhone key="bind" />],
    // },
    // {
    //   title: '密保问题',
    //   description: '未设置密保问题，密保问题可有效保护账户安全',
    //   actions: [<a key="Set">设置</a>],
    // },
    // {
    //   title: "邮箱账号",
    //   description: `已绑定邮箱：ant***sign.com`,
    //   actions: [<BindEmail key="Modify" />],
    // },
    // {
    //   title: 'MFA 设备',
    //   description: '未绑定 MFA 设备，绑定后，可以进行二次确认',
    //   actions: [<a key="bind">绑定</a>],
    // },
  ];

  const data = getData();

  return (
    <>
      {currentUserInfo ? (
        <>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item actions={item.actions}>
                <List.Item.Meta
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            )}
          />
          <ModalForm
            title="修改密码"
            open={modalVisit}
            onFinish={async (values) => {
              console.log("values", values);
              //   await bladeApi.services.bladeUser.updatePassword(
              //     md5(values.oldPassword),
              //     md5(values.newPassword),
              //     md5(values.newPassword1),
              //   );
              try {
                await store.getState().request("/blade-user/update-password", {
                  apiName: "blade",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  method: "POST",
                  body: JSON.stringify({
                    oldPassword: md5(values.oldPassword),
                    newPassword: md5(values.newPassword),
                    newPassword1: md5(values.newPassword1),
                  }),
                });
                message.success("修改成功");
                return true;
              } catch (error: any) {
                message.error(error.message);
              }
              return false;
            }}
            onOpenChange={setModalVisit}
          >
            <ProFormText.Password
              name="oldPassword"
              label="原密码"
              rules={[{ required: true, message: "请输入原密码" }]}
            />
            <ProFormText.Password
              name="newPassword"
              label="新密码"
              rules={[{ required: true, message: "请输入新密码" }]}
            />
            <ProFormText.Password
              name="newPassword1"
              label="确认密码"
              dependencies={["newPassword"]}
              rules={[
                { required: true, message: "请确认密码" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("密码不匹配"));
                  },
                }),
              ]}
            />
          </ModalForm>
        </>
      ) : null}
    </>
  );
};

const AvatarView = ({
  avatar,
  onChange,
}: {
  avatar: string;
  onChange: (file: File) => void;
}) => {
  return (
    <>
      <div
        style={{
          height: 22,
          marginBlockEnd: 8,
          color: "@heading-color",
          fontSize: "@font-size-base",
          lineHeight: 22,
        }}
      >
        头像
      </div>
      <div className="w-[144px] h-[144px] mb-[12px] overflow-hidden">
        <img src={avatar} alt="avatar" className="w-full" />
      </div>
      {/* <BladeUpload showUploadList={false} onChange={handleChange}>
          <div className={styles.button_view}>
            <Button>
              <UploadOutlined />
              更换头像
            </Button>
          </div>
        </BladeUpload> */}

      <Upload
        showUploadList={false}
        beforeUpload={(file) => {
          onChange(file);
          return false;
        }}
        accept="image/png, image/jpeg"
      >
        <div className="w-[144px] text-center">
          <Button>
            <UploadOutlined />
            更换头像
          </Button>
        </div>
      </Upload>
    </>
  );
};

const BaseView: React.FC = () => {
  const store = useStoreApi();
  const user = useStore((it) => it.user);
  const [file, setFile] = useState<File>();

  const thumbUrl = useMemo(() => {
    if (file) {
      return window.URL.createObjectURL(file);
    }

    return user?.avatar || avatar;
  }, [file, user]);

  const handleFinish = async (values: any) => {
    values.avatar = user!.avatar;
    values.id = user!.id;

    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        var attach = await store
          .getState()
          .request<BladeAttach>("/blade-resource/oss/endpoint/put-file", {
            method: "POST",
            body: formData,
          });
        values.avatar = attach.link;
      }

      await store.getState().request("/blade-user/update-info", {
        apiName: "blade",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          ...values,
        }),
      });

      store.getState().getUserInfo();
      message.success("更新基本信息成功");
    } catch {
    } finally {
    }
  };
  const onAvatarChange = (value: any) => {
    // formRef?.current?.setFieldsValue({
    //   avatar: value,
    // });
    setFile(value);
  };

  // useEffect(() => {
  //   webApi.services.bladeUser.getUserInfo().then((data) => {
  //     setCurrentUserInfo({
  //       loading: false,
  //       currentUser: data,
  //     });
  //   });
  // }, []);

  // if (!currentUserInfo) {
  //   return null;
  // }
  return (
    <div
      // className={css`
      //   display: flex;
      //   padding-top: 12px;
      //   .ant-legacy-form-item .ant-legacy-form-item-control-wrapper {
      //     width: 100%;
      //   }
      // `}
      className="flex pt-3"
    >
      {user ? (
        <>
          <div
            className="min-w-[224px] max-w-[448px]"
          >
            <ProForm
              layout="vertical"
              onFinish={handleFinish}
              submitter={{
                searchConfig: {
                  submitText: "更新基本信息",
                },
                render: (_, dom) => dom[1],
              }}
              omitNil={false}
              initialValues={{
                ...user,
              }}
            >
              <ProFormText
                width="md"
                name="realName"
                label="姓名"
                rules={[
                  {
                    required: true,
                  },
                ]}
              />

              <ProFormSelect
                width="md"
                name="sex"
                label="性别"
                allowClear={false}
                request={async () => [
                  { label: "男", value: 1 },
                  { label: "女", value: 2 },
                  { label: "未知", value: -1 },
                ]}
              />

              <ProFormText
                width="md"
                name="deptName"
                label="班级"
                disabled
                // rules={[
                //   {
                //     required: true,
                //   },
                // ]}
              />
              {/* <ProFormTextArea
                  name="profile"
                  label="个人简介"
                  rules={[
                    {
                      required: true,
                      message: '请输入个人简介!',
                    },
                  ]}
                  placeholder="个人简介"
                /> */}
              {/* <ProFormSelect
                  width="sm"
                  name="country"
                  label="国家/地区"
                  rules={[
                    {
                      required: true,
                      message: '请输入您的国家或地区!',
                    },
                  ]}
                  options={[
                    {
                      label: '中国',
                      value: 'China',
                    },
                  ]}
                /> */}
              {/* 
                <ProForm.Group title="所在省市" size={8}>
                  <ProFormSelect
                    rules={[
                      {
                        required: true,
                        message: '请输入您的所在省!',
                      },
                    ]}
                    width="sm"
                    fieldProps={{
                      labelInValue: true,
                    }}
                    name="province"
                    className={styles.item}
                    request={async () => {
                      return queryProvince().then(({ data }) => {
                        return data.map((item) => {
                          return {
                            label: item.name,
                            value: item.id,
                          };
                        });
                      });
                    }}
                  />
                  <ProFormDependency name={['province']}>
                    {({ province }) => {
                      return (
                        <ProFormSelect
                          params={{
                            key: province?.value,
                          }}
                          name="city"
                          width="sm"
                          rules={[
                            {
                              required: true,
                              message: '请输入您的所在城市!',
                            },
                          ]}
                          disabled={!province}
                          className={styles.item}
                          request={async () => {
                            if (!province?.key) {
                              return [];
                            }
                            return queryCity(province.key || '').then(({ data }) => {
                              return data.map((item) => {
                                return {
                                  label: item.name,
                                  value: item.id,
                                };
                              });
                            });
                          }}
                        />
                      );
                    }}
                  </ProFormDependency>
                </ProForm.Group>
                <ProFormText
                  width="md"
                  name="address"
                  label="街道地址"
                  rules={[
                    {
                      required: true,
                      message: '请输入您的街道地址!',
                    },
                  ]}
                /> */}

              {/* <ProFormText
                width="md"
                name="phone"
                label="联系电话"
                rules={[
                  {
                    required: true,
                    message: "请输入您的联系电话!",
                  },
                ]}
              /> */}
            </ProForm>
          </div>
          <div
            className="pl-[104px] flex-1"
          >
            <AvatarView avatar={thumbUrl} onChange={onAvatarChange} />
          </div>
        </>
      ) : null}
    </div>
  );
};

type SettingsStateKeys = "base" | "security" | "binding" | "notification";
type SettingsState = {
  mode: "inline" | "horizontal";
  selectKey: SettingsStateKeys;
};

const Settings: React.FC = () => {
  const menuMap: Record<string, React.ReactNode> = {
    base: "基本设置",
    security: "安全设置",
    // binding: '账号绑定',
    // notification: '新消息通知',
  };

  const [initConfig, setInitConfig] = useState<SettingsState>({
    mode: "inline",
    selectKey: "base",
  });
  //   const dom = useRef<HTMLDivElement>();

  //   const resize = () => {
  //     requestAnimationFrame(() => {
  //       if (!dom.current) {
  //         return;
  //       }
  //       let mode: "inline" | "horizontal" = "inline";
  //       const { offsetWidth } = dom.current;
  //       if (dom.current.offsetWidth < 641 && offsetWidth > 400) {
  //         mode = "horizontal";
  //       }
  //       if (window.innerWidth < 768 && offsetWidth > 400) {
  //         mode = "horizontal";
  //       }
  //       setInitConfig({ ...initConfig, mode: mode as SettingsState["mode"] });
  //     });
  //   };

  //   useLayoutEffect(() => {
  //     if (dom.current) {
  //       window.addEventListener("resize", resize);
  //       resize();
  //     }
  //     return () => {
  //       window.removeEventListener("resize", resize);
  //     };
  //   }, [dom.current]);

  const getMenu = () => {
    return Object.keys(menuMap).map((item) => (
      <Item key={item}>{menuMap[item]}</Item>
    ));
  };

  //   const renderChildren = () => {
  //     const { selectKey } = initConfig;
  //     switch (selectKey) {
  //       case 'base':
  //         return <BaseView />;
  //       case 'security':
  //         return <SecurityView />;
  //       case 'binding':
  //         return <BindingView />;
  //       case 'notification':
  //         return <NotificationView />;
  //       default:
  //         return null;
  //     }
  //   };
  const renderChildren = () => {
    const { selectKey } = initConfig;
    switch (selectKey) {
      case "base":
        return <BaseView />;
      case "security":
        return <SecurityView />;
      // case "binding":
      //   return <div>12</div>;
      // case "notification":
      //   return <div>12</div>;
      default:
        return null;
    }
  };
  return (
    <Flex justify="center">
      <PageContainer title="个人中心" style={{ width: 1280 }}>
        <Card>
          <div
            className="flex w-full h-full py-4"
            //   ref={(ref) => {
            //     if (ref) {
            //       dom.current = ref;
            //     }
            //   }}
          >
            <div
              // className={css`
              //   width: 224px;
              //   border-right: 1px solid #f0f0f0;
              //   padding-right: 16px;
              //   .ant-menu-inline {
              //     border: none !important;
              //   }
              // `}
              className="w-[224px] pr-4"
            >
              <Menu
                mode={initConfig.mode}
                selectedKeys={[initConfig.selectKey]}
                onClick={({ key }) => {
                  setInitConfig({
                    ...initConfig,
                    selectKey: key as SettingsStateKeys,
                  });
                }}
              >
                {getMenu()}
              </Menu>
            </div>
            <div
              // className={css`
              //   flex: 1;
              //   padding: 8px 40px;
              // `}
              className="flex-1 px-10 py-2"
            >
              <div >{menuMap[initConfig.selectKey]}</div>
              {renderChildren()}
            </div>
          </div>
        </Card>
      </PageContainer>
    </Flex>
  );
};
export default Settings;
