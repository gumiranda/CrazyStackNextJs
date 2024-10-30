/* eslint-disable prefer-const */
import axios, { AxiosError } from "axios";
import { destroyCookie, parseCookies, setCookie } from "nookies";
let isRefreshing = false;
let failedRequestsQueue: any = [];
export const getAxios = (token: string) => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export function setupAPIClient(ctx = undefined) {
  let cookies: any = ctx;
  if (!cookies?.["belezixclient.token"]) {
    cookies = parseCookies();
  }
  if (!cookies) {
    return null;
  }
  const api = getAxios(cookies["belezixclient.token"]);
  api.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
      if (error?.response?.status === 401) {
        if (error?.response?.data?.error === "Unauthorized") {
          cookies = ctx;
          if (!cookies?.["belezixclient.token"]) {
            cookies = parseCookies();
          }
          const { "belezixclient.refreshToken": refreshToken } = cookies;
          const originalConfig = error.config;
          if (!isRefreshing) {
            isRefreshing = true;
            api
              .get("/auth/refresh-token", {
                headers: { refreshtoken: refreshToken },
              })
              .then((response) => {
                const { accessToken: token, refreshToken: newRefreshToken } =
                  response?.data;
                setCookie(undefined, "belezixclient.token", token, {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: "/",
                });
                setCookie(null, "belezixclient.refreshToken", newRefreshToken, {
                  maxAge: 30 * 24 * 60 * 60,
                  path: "/",
                });
                api.defaults.timeout = 15000;
                api.defaults.headers["Authorization"] = `Bearer ${token}`;
                api.defaults.headers["refreshtoken"] = `${newRefreshToken}`;
                failedRequestsQueue.forEach((request: any) =>
                  request.onSuccess(token),
                );
                failedRequestsQueue = [];
              })
              .catch((err) => {
                failedRequestsQueue.forEach((request: any) =>
                  request.onFailure(err),
                );
                failedRequestsQueue = [];
                if (typeof window === "undefined") {
                  signOut();
                }
              })
              .finally(() => {
                isRefreshing = false;
              });
          }
          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers["Authorization"] = `Bearer ${token}`;
                resolve(api(originalConfig));
              },
              onFailure: (err: AxiosError) => {
                reject(err);
              },
            });
          });
        }
        if (typeof window === "undefined") {
          signOut();
        }
      }
      return Promise.reject(error);
    },
  );
  return api;
}
export const api = setupAPIClient();
export function signOut() {
  destroyCookie(undefined, "belezixclient.token");
  destroyCookie(undefined, "belezixclient.refreshToken");
  destroyCookie(undefined, "belezixclient.user");
  destroyCookie(undefined, "belezixclient.cache");
  destroyCookie(undefined, "belezixclient.photo");
}
