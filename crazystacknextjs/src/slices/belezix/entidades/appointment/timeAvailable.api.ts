import { setupAPIClient } from "@/shared/api";
import { TimeAvailableProps, timeAvailableModel } from "./timeAvailable.model";

export const getTimeAvailables = async (
  params: any = {},
  ctx: any,
): Promise<TimeAvailableProps | null> => {
  const apiClient = setupAPIClient(ctx);
  if (!apiClient) {
    throw new Error("API client is null");
  }
  const { data } = await apiClient.get("/appointment/loadAvailableTimes", {
    params,
  });
  const { timeAvailable, timeAvailableProfessional } = data || {};
  if (!timeAvailable) {
    return null;
  }
  return timeAvailableModel({
    ...params,
    timeAvailable,
    timeAvailableProfessional,
  }).format();
};
