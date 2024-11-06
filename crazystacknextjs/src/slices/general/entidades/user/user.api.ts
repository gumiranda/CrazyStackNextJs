import { setupAPIClient } from "@/shared/api";
import { UserProps, userModel } from "./user.model";
const PUBLIC_ROUTE = "/public/user/loadByPage";
const PRIVATE_ROUTE = "/user/loadByPage";
export type GetUsersResponse = {
  users: UserProps[];
  totalCount: number;
  next?: number;
  prev?: number;
};
const registerByPage = 10;
export const getUsers = async (
  page: number,
  ctx: any,
  params: any = {},
): Promise<GetUsersResponse> => {
  const apiClient = setupAPIClient(ctx);
  if (!apiClient) {
    throw new Error("API client is null");
  }
  const { data } = await apiClient.get(PRIVATE_ROUTE, {
    params: { page, sortBy: "createdAt", typeSort: "desc", ...params },
  });
  const { users = [], total } = data || {};
  const totalCount = Number(total ?? 0);
  const lastPage = Number.isInteger(totalCount / registerByPage)
    ? totalCount / registerByPage
    : Math.floor(totalCount / registerByPage) + 1;
  const response = {
    users: users?.map?.((props: UserProps) => userModel(props).format()),
    totalCount,
  };
  if (lastPage > page) {
    Object.assign(response, { next: page + 1 });
  }
  if (page > 1) {
    Object.assign(response, { prev: page - 1 });
  }
  return response;
};
export const getUsersPublic = async (
  page: number,
  ctx: any,
  params: any = {},
): Promise<GetUsersResponse> => {
  const limitPerPage = 100;
  const apiClient = setupAPIClient(ctx);
  if (!apiClient) {
    throw new Error("API client is null");
  }
  const { data } = await apiClient.get(PUBLIC_ROUTE, {
    params: {
      page,
      sortBy: "createdAt",
      typeSort: "desc",
      limitPerPage,
      ...params,
    },
  });
  const { users = [], total } = data || {};
  const totalCount = Number(total ?? 0);
  const lastPage = Number.isInteger(totalCount / limitPerPage)
    ? totalCount / limitPerPage
    : Math.floor(totalCount / limitPerPage) + 1;
  const response = {
    users: users?.map?.((props: UserProps) => userModel(props).format()),
    totalCount,
  };
  if (lastPage > page) {
    Object.assign(response, { next: page + 1 });
  }
  if (page > 1) {
    Object.assign(response, { prev: page - 1 });
  }
  return response;
};
type InfiniteProps = {
  pageParam: number;
  ctx: any;
};
export const getInfiniteUsers = async ({
  pageParam = 1,
  ctx,
}: InfiniteProps): Promise<GetUsersResponse> => {
  return getUsers(pageParam, ctx);
};
export const getUserById = async (
  id: string,
  ctx: any,
): Promise<UserProps | null> => {
  try {
    const apiClient = setupAPIClient(ctx);
    if (!apiClient) {
      throw new Error("API client is null");
    }
    const { data } = await apiClient.get("/user/load", {
      params: { _id: id },
    });
    if (!data) {
      return null;
    }
    return userModel(data).format();
  } catch (error) {
    console.error("Error on getUserById", error);
    return null;
  }
};
export const deleteUserById = async (id: string, ctx: any): Promise<any> => {
  try {
    const apiClient = setupAPIClient(ctx);
    if (!apiClient) {
      throw new Error("API client is null");
    }
    const { data } = await apiClient.delete("/user/delete", {
      params: { _id: id },
    });
    if (!data) {
      return null;
    }
    return userModel(data).format();
  } catch (error) {
    console.error("Error on deleteUserById", error);
    return null;
  }
};
