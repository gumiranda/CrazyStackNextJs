export const verifyEmail = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, code: token }),
    },
  );
  if (!response.ok) {
    console.log("response");
    return;
  }
  const data = await response.json();
  console.log(data);
  return data;
};
