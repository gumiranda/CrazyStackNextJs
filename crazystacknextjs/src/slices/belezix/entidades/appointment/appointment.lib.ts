import { getAppointments, getInfiniteAppointments } from "./appointment.api";
import {
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { getTimeAvailables } from "./timeAvailable.api";
export const useGetAppointments = (
  page: number,
  options?: UseQueryOptions,
  ctx?: any,
): any => {
  return useQuery({
    queryKey: ["appointments", page],
    queryFn: () => getAppointments(page, null, ctx),
    staleTime: 1000 * 5,
    ...options,
  } as any);
};
export const useGetTimeAvailables = (
  options?: Omit<UseQueryOptions, "queryKey">,
  params?: any,
): any => {
  return useQuery({
    queryKey: ["useGetTimeAvailables"],
    queryFn: () => getTimeAvailables(params, null),
    staleTime: 1000 * 5,
    ...options,
  } as any);
};
export const useGetInfiniteAppointments = (
  options: Omit<UseInfiniteQueryOptions, "queryKey">,
) => {
  return useInfiniteQuery({
    queryKey: ["appointmentsInfinite"],
    queryFn: ({ pageParam = 1 }: any) => getInfiniteAppointments(pageParam, {}),
    ...options,
  });
};
