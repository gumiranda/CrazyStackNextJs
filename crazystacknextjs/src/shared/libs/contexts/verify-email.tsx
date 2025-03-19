export const verifyEmail = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email?email=${email}&code=${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, code: token }),
    },
  );
  if (!response.ok) {
    return;
  }
  const data = await response.json();
  return data;
};
