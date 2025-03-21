import { whitelabel } from "@/application/whitelabel";
import type { Metadata } from "next";
import { FallbackEmailVerified } from "./_components/FallbackEmailVerified";
import { verifyEmail } from "@/shared/libs/contexts/verify-email";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  if (!result?.message) {
    return <FallbackEmailVerified email={email} />;
  }
  return (
    <div className="flex justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Email Verification</CardTitle>
          <CardDescription>Were verifying your email address</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <p className="text-center text-muted-foreground font-medium">
              Email verified successfully!
            </p>
            <Button asChild variant={"secondary"} className="mt-4">
              <Link href="/">Continue to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
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
