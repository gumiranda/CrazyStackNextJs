import { whitelabel } from "@/application/whitelabel";
import type { Metadata } from "next";
import { FallbackEmailVerified } from "./_components/FallbackEmailVerified";
import { verifyEmail } from "@/shared/libs/contexts/verify-email";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Verificar email`,
  description: `Página de verificar email do ${whitelabel.systemName}. Aqui você pode verificar seu email.`,
};
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const emailParam = (await searchParams).email;
  const tokenParam = (await searchParams).token;
  const email = Array.isArray(emailParam) ? emailParam?.[0] : emailParam;
  const token = Array.isArray(tokenParam) ? tokenParam?.[0] : tokenParam;
  const result = await handleEmailVerification({ email, token });
  if (!result) {
    return <FallbackEmailVerified email={email} />;
  }
  return <div>VerifyEmailPage</div>;
}
async function handleEmailVerification({
  email,
  token,
}: {
  email: string | undefined;
  token: string | undefined;
}) {
  try {
    if (!email || !token) return null;
    const result = await verifyEmail({ email, token });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
