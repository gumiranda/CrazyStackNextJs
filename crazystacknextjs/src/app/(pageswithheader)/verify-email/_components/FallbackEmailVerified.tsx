"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { api } from "@/shared/api";
export function FallbackEmailVerified({ email = "" }) {
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendSuccess, setResendSuccess] = useState(false);

  async function resendVerificationEmail() {
    setIsResending(true);
    setError(null);
    setResendSuccess(false);

    try {
      if (!api) {
        throw new Error("API instance is not available");
      }
      const response = await api.post("/auth/resend-email", { email });
      setResendSuccess(!!response?.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    } finally {
      setIsResending(false);
    }
  }

  return (
    <div className="flex justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Check your email</CardTitle>
          <CardDescription>
            We ve sent a verification link to {email || "your email address"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {resendSuccess && (
            <Alert className="mb-4 bg-green-50 border-green-200">
              <AlertDescription className="text-green-700">
                Verification email sent successfully!
              </AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col items-center justify-center py-8">
            <Mail className="h-12 w-12 text-primary mb-4" />
            <p className="text-center text-gray-500 max-w-xs">
              Click the link in the email to verify your account. If you see it,
              check your spam folder.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={resendVerificationEmail}
            disabled={isResending}
          >
            {isResending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Resending...
              </>
            ) : (
              "Resend verification email"
            )}
          </Button>
          <p className="text-sm text-center text-gray-500 mt-2">
            Already verified?{" "}
            <Link href="/login" className="text-primary font-medium">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
