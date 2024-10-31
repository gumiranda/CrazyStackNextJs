import { setupAPIClient } from "@/shared/api";
import { AppointmentProps, appointmentModel } from "./appointment.model";
export type GetAppointmentsResponse = {
  appointments: AppointmentProps[];
  totalCount: number;
  next?: number;
  prev?: number;
};
const registerByPage = 10;
export const getAppointments = async (
  page: number,
  ctx: any,
  params: any = {},
): Promise<GetAppointmentsResponse> => {
  const apiClient = setupAPIClient(ctx);
  if (!apiClient) {
    throw new Error("API client is null");
  }
  const { data } = await apiClient.get("/appointment/loadByPage", {
    params: { page, sortBy: "createdAt", typeSort: "desc", ...params },
  });
  const { appointments, total } = data || {};
  const totalCount = Number(total ?? 0);
  const lastPage = Number.isInteger(totalCount / registerByPage)
    ? totalCount / registerByPage
    : Math.floor(totalCount / registerByPage) + 1;
  const response = {
    appointments: appointments?.map?.((props: AppointmentProps) =>
      appointmentModel(props).format(),
    ),
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
};
export const getInfiniteAppointments = async (
  page: number,
  params: any,
): Promise<GetAppointmentsResponse> => {
  return getAppointments(page, null, params);
};
export const getAppointmentById = async (
  id: string,
  ctx: any,
): Promise<AppointmentProps | null> => {
  try {
    if (!ctx) {
      throw new Error("Context is null");
    }
    const apiClient = setupAPIClient(ctx);
    if (!apiClient) {
      throw new Error("API client is null");
    }
    const { data } = await apiClient.get("/appointment/load", {
      params: { _id: id },
    });
    if (!data) {
      return null;
    }
    return appointmentModel(data).format();
  } catch (error) {
    return null;
  }
};
