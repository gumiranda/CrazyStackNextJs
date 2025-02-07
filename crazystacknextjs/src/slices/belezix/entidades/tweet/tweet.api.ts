import { setupAPIClient } from "@/shared/api";
import { TweetProps, tweetModel } from "./tweet.model";
export type GetTweetsResponse = {
  tweets: TweetProps[];
  totalCount: number;
  next?: number;
  prev?: number;
};
const registerByPage = 10;

export const addTweet = async ({ tweet, cookies }: any) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tweet/add`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cookies["belezixclient.token"]}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tweet),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  return null;
};
export const toggleLike = async ({ tweetlike, cookies }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tweetlike/toggleLike`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookies["belezixclient.token"]}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tweetlike),
    },
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  return null;
};

export const getTweets = async (
  page: number,
  ctx: any,
  params: any = {},
): Promise<GetTweetsResponse> => {
  const apiClient = setupAPIClient(ctx);
  if (!apiClient) {
    throw new Error("API client is null");
  }
  const { data } = await apiClient.get(
    !ctx ? "publictweet/loadByPage" : "/tweet/loadByPage",
    {
      params: { page, sortBy: "createdAt", typeSort: "desc", ...params },
    },
  );
  const { tweets, total } = data || {};
  const totalCount = Number(total ?? 0);
  const lastPage = Number.isInteger(totalCount / registerByPage)
    ? totalCount / registerByPage
    : Math.floor(totalCount / registerByPage) + 1;
  const response = {
    tweets: tweets?.map?.((props: TweetProps) => tweetModel(props).format()),
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

export const getInfiniteTweets = async (
  page: number,
  params: any,
): Promise<GetTweetsResponse> => {
  return getTweets(page, null, params);
};
export const getTweetById = async (
  id: string,
  ctx: any,
): Promise<TweetProps | null> => {
  try {
    if (!ctx) {
      throw new Error("Context is null");
    }
    const apiClient = setupAPIClient(ctx);
    if (!apiClient) {
      throw new Error("API client is null");
    }
    const { data } = await apiClient.get("/tweet/load", {
      params: { _id: id },
    });
    if (!data) {
      return null;
    }
    return tweetModel(data).format();
  } catch (error) {
    return null;
  }
};
