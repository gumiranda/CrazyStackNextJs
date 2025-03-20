import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export function FallbackEmailVerified({ email = "" }) {
  return (
    <div className="flex justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Email Versasaification</CardTitle>
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
