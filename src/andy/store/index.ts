import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { AndyRequestOption, AppState, Token, User } from "../typing";
import initialState from "./initialState";
import dayjs from "dayjs";
import apiFactory from "../utils/apiFactory";

const useBearStore = create(
  //     (set) => ({
  //     bears: 0,
  //     increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  //     removeAllBears: () => set({ bears: 0 }),
  //   })
  persist<AppState>(
    (set, get) => ({
      ...initialState,
      // addAFish: () => set({ fishes: get().fishes + 1 }),
      setUser: (user: User) => set({ user }),
      setToken: (token: Token | null) => set({ token }),
      setIsLogin: (isLogin: boolean) => set({ isLogin }),
      login: (token: Token) => {
        set({
          token,
          loginTime: dayjs(),
          isLogin: true,
        });
      },
      logout: () => {
        set({
          token: null,
          loginTime: null,
          isLogin: false,
        });
      },
      getUserInfo: async () => {
        const { user,token, setUser, request } = get();
        // console.log('token',token)

        try {
          let res = await request<User>("/blade-user/detail?id=" + token?.user_id, {
            method: "GET",
            apiName: "blade",
          });
          if (user?.updateTime !== res.updateTime) {
            setUser(res);
          }
        } catch (error) {
          console.log("getUserInfo error", error);
        }
      },

      request: <T>(url: string, option?: AndyRequestOption) => {
        const { apiName, method, ...rest } = {
          apiName: "blade",
          method: "GET",
          ...option,
        };
        const { token, loginTime, logout } = get();
        if (
          token &&
          loginTime &&
          dayjs() > loginTime.add(token.expires_in, "second")
        ) {
          logout();
          throw Error();
        }
        var request = apiFactory.getRequest(apiName);
        return request(url, {
          method: method,
          token: token?.access_token,
          ...rest,
        }).catch((error) => {
          console.log("api error", error);
          throw error;
        }) as Promise<T>;
      },
      download: (url: string) => {
        const { token, api } = get();
        window.open(
          `${api['blade']}${url}${url.includes("?") ? "&" : "?"}Blade-Auth=${token?.access_token}`
        );
      },
    }),
    {
      name: "app-storage", // name of the item in the storage (must be unique)
      onRehydrateStorage: () => {
        // console.log('hydration starts', state)

        // optional
        return (state, error) => {
          if (error) {
            console.log("an error happened during hydration", error);
          } else {
            if (state?.loginTime) {
              state.loginTime = dayjs(state.loginTime);
            }
            // console.log('hydration finished', state)
          }
        };
      },
      storage: createJSONStorage(() => localStorage, {
        // reviver: (key, value) => {
        //   console.log("key111", key, value);
        //   // if (value && value.type === 'date') {
        //   //   return new Date(value)
        //   // }
        //   return value;
        // },
        // replacer: (key, value) => {
        //   console.log("key222", key, value);
        //   // if (value instanceof Date) {
        //   //   return { type: 'date', value: value.toISOString() }
        //   // }
        //   return value;
        // },
      }), // (optional) by default, 'localStorage' is used
      version: 5,
    }
  )
);

export { useBearStore };
