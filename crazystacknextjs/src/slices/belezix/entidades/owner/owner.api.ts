import { setupAPIClient } from "@/shared/api";
import { ownerModel, type OwnerProps } from "./owner.model";
const PUBLIC_ROUTE = "/public/owner";
const PRIVATE_ROUTE = "/owner";

export const getOwnersPublic = async (
  page: number,
  ctx: any,
  params: any = {},
) => {
  const limitPerPage = 100;
  const apiClient = setupAPIClient(ctx);
  if (!apiClient) {
    throw new Error("API client is null");
  }
  const { data } = await apiClient.get(`${PUBLIC_ROUTE}/loadByPage`, {
    params: { page, sortBy: "name", typeSort: "desc", limitPerPage, ...params },
  });
  const { owners, total } = data || {};
  const totalCount = Number(total ?? 0);
  const lastPage = Number.isInteger(totalCount / limitPerPage)
    ? totalCount / limitPerPage
    : Math.floor(totalCount / limitPerPage) + 1;
  const response = {
    owners:
      owners?.map?.((props: OwnerProps) => ownerModel(props).format()) ?? [],
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

export const getOwners = async (page: number, ctx: any, params: any = {}) => {
  const limitPerPage = 10;
  const apiClient = setupAPIClient(ctx);
  if (!apiClient) {
    throw new Error("API client is null");
  }
  const { data } = await apiClient.get(`${PRIVATE_ROUTE}/loadByPage`, {
    params: { page, sortBy: "name", typeSort: "desc", limitPerPage, ...params },
  });
  const { owners, total } = data || {};
  const totalCount = Number(total ?? 0);
  const lastPage = Number.isInteger(totalCount / limitPerPage)
    ? totalCount / limitPerPage
    : Math.floor(totalCount / limitPerPage) + 1;
  const response = {
    owners:
      owners?.map?.((props: OwnerProps) => ownerModel(props).format()) ?? [],
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
export const getOwnerByIdPublic = async (
  id: string,
  ctx: any,
): Promise<OwnerProps | null> => {
  try {
    const apiClient = setupAPIClient(ctx);
    if (!apiClient) {
      throw new Error("API client is null");
    }
    const { data } = await apiClient.get("/public/owner/load", {
      params: { _id: id },
    });
    if (!data) {
      return null;
    }
    return ownerModel(data).format();
  } catch (error) {
    return null;
  }
};
