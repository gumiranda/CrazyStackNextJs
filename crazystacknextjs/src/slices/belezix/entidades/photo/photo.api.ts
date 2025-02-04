import { setupAPIClient } from "@/shared/api";
import { PhotoProps, photoModel } from "./photo.model";
export type GetPhotosResponse = {
  photos: PhotoProps[];
  totalCount: number;
  next?: number;
  prev?: number;
};
const registerByPage = 10;
export const uploadPhoto = async ({ formDataImage, cookies }: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/uploadPhoto`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookies["belezixclient.token"]}`,
      },
      body: formDataImage,
    },
  );
  if (response.ok) {
    const data = await response.json();
    console.log("Image uploaded:", data);
    return data;
  }
  return null;
};

export const getPhotos = async (
  page: number,
  ctx: any,
  params: any = {},
): Promise<GetPhotosResponse> => {
  const apiClient = setupAPIClient(ctx);
  if (!apiClient) {
    throw new Error("API client is null");
  }
  const { data } = await apiClient.get("/photo/loadByPage", {
    params: { page, sortBy: "createdAt", typeSort: "desc", ...params },
  });
  const { photos, total } = data || {};
  const totalCount = Number(total ?? 0);
  const lastPage = Number.isInteger(totalCount / registerByPage)
    ? totalCount / registerByPage
    : Math.floor(totalCount / registerByPage) + 1;
  const response = {
    photos: photos?.map?.((props: PhotoProps) => photoModel(props).format()),
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

export const getInfinitePhotos = async (
  page: number,
  params: any,
): Promise<GetPhotosResponse> => {
  return getPhotos(page, null, params);
};
export const getPhotoById = async (
  id: string,
  ctx: any,
): Promise<PhotoProps | null> => {
  try {
    if (!ctx) {
      throw new Error("Context is null");
    }
    const apiClient = setupAPIClient(ctx);
    if (!apiClient) {
      throw new Error("API client is null");
    }
    const { data } = await apiClient.get("/photo/load", {
      params: { _id: id },
    });
    if (!data) {
      return null;
    }
    return photoModel(data).format();
  } catch (error) {
    return null;
  }
};
