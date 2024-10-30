import { setupAPIClient } from "@/shared/api";
import { requestModel, type RequestProps } from "./request.model";

const PRIVATE_ROUTE = "/request";

export const getRequests = async (page: number, ctx: any, params: any = {}) => {
  const limitPerPage = 10;
  const apiClient = setupAPIClient(ctx);
  if (!apiClient) {
    throw new Error("API client is null");
  }
  const { data } = await apiClient.get(`${PRIVATE_ROUTE}/loadByPage`, {
    params: { page, sortBy: "name", typeSort: "desc", limitPerPage, ...params },
  });
  const { requests, total } = data || {};
  const totalCount = Number(total ?? 0);
  const lastPage = Number.isInteger(totalCount / limitPerPage)
    ? totalCount / limitPerPage
    : Math.floor(totalCount / limitPerPage) + 1;
  const response = {
    requests:
      requests?.map?.((props: RequestProps) => requestModel(props).format()) ??
      [],
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
