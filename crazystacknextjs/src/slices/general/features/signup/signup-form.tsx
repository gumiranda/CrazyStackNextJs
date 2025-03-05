"use client";

import { useTranslation } from "react-i18next";
import { useSignUp } from "./signup.hook";
import { cn } from "@/lib/utils";
import { EmailPasswordForm } from "./components/email-password-form";
import { SocialButton } from "@/shared/ui/atoms/social-button/social-button";
import { Icons } from "@/components/ui/icons";

interface SignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const { formState, handleSubmit, register, handleSignUp, formProps } =
    useSignUp();
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <EmailPasswordForm
        formState={formState}
        handleSubmit={handleSubmit}
        register={register}
        handleSignUp={handleSignUp}
        formProps={formProps}
      />
      <GoogleSignUpSection formState={formState} />
    </div>
  );
}

const GoogleSignUpSection = ({ formState }: { formState: any }) => {
  const { t } = useTranslation(["PAGES"]);

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {t("PAGES:AUTH_PAGE.orContinueWith", {
              defaultValue: "Or continue with",
            })}
          </span>
        </div>
      </div>
      <SocialButton icon={Icons.google} disabled={formState.isSubmitting}>
        Google
      </SocialButton>
    </>
  );
};
