import { api } from "@/shared/api";

export const verifyEmail = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  if (!api) {
    throw new Error("API is not initialized");
  }
  console.log({ email, token });
  const response = await api.post("auth/verify-email", {
    email,
    code: token,
  });
  return response;
};
