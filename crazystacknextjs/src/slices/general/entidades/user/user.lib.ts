import {
  getUsers,
  getInfiniteUsers,
  getUserById,
  getUsersPublic,
} from "./user.api";
import {
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
export const useGetUsers = (
  page: number,
  options?: Omit<UseQueryOptions, "queryKey">,
  ctx?: any,
): any => {
  return useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsers(page, null, ctx),
    staleTime: 1000 * 5,
    ...options,
  } as any);
};
export const useGetUsersPublic = (
  page: number,
  options?: Omit<UseQueryOptions, "queryKey">,
  ctx?: any,
): any => {
  return useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsersPublic(page, null, ctx),
    staleTime: 1000 * 5,
    ...options,
  } as any);
};
export const useGetInfiniteUsers = (
  options: Omit<UseInfiniteQueryOptions, "queryKey">,
) => {
  return useInfiniteQuery({
    queryKey: ["usersInfinite"],
    queryFn: ({ pageParam = 1 }: any) => getInfiniteUsers(pageParam),
    ...options,
  });
};
export const useGetUserById = (id: string, options?: UseQueryOptions) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id, null),
    ...options,
  });
};
