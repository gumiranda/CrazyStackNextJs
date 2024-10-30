"use client";

import { useTranslation } from "react-i18next";
import { useLogin } from "./login.hook";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const { formState, handleSubmit, register, handleLogin } = useLogin();
  const { t } = useTranslation(["PAGES"]);
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="grid gap-2">
          <div className="grid gap-3 mb-2">
            <Label htmlFor="email" className="sr-only">
              {t("PAGES:AUTH_PAGE.email", { defaultValue: "Email" })}
            </Label>
            <Input
              id="email"
              placeholder={t("PAGES:AUTH_PAGE.placeholderemail", {
                defaultValue: "name@example.com",
              })}
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={formState.isSubmitting}
              {...register("email")}
            />
            {!!formState.errors.email && (
              <p className="text-destructive text-sm">
                {formState?.errors?.email?.message}
              </p>
            )}
          </div>

          <div className="grid gap-3">
            <Label className="sr-only" htmlFor="email">
              {t("PAGES:AUTH_PAGE.password", {
                defaultValue: "Senha",
              })}
            </Label>
            <Input
              id="password"
              placeholder={t("PAGES:AUTH_PAGE.placeholderpassword", {
                defaultValue: "********",
              })}
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={formState.isSubmitting}
              {...register("password")}
            />
            {!!formState.errors.password && (
              <p className="text-destructive text-sm">
                {formState?.errors?.password?.message}
              </p>
            )}
          </div>
          <Button disabled={formState.isSubmitting} className="mt-2">
            {formState.isSubmitting && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {t("PAGES:AUTH_PAGE.signIn", { defaultValue: "Entrar" })}
          </Button>
        </div>
      </form>
      <DivLoginGoogle formState={formState} />
    </div>
  );
}

const DivLoginGoogle = ({ formState }: any) => {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={formState.isSubmitting}>
        {formState.isSubmitting ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </>
  );
};
