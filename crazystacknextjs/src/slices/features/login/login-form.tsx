"use client";

import { useTranslation } from "react-i18next";
import { useLogin } from "./login.hook";
import { cn } from "@/lib/utils";

// Atoms
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Molecules
const FormField = ({
  label,
  id,
  type,
  placeholder,
  disabled,
  register,
  error,
}) => (
  <div className="grid gap-3">
    <Label htmlFor={id} className="sr-only">
      {label}
    </Label>
    <Input
      id={id}
      placeholder={placeholder}
      type={type}
      autoCapitalize="none"
      autoComplete={type}
      autoCorrect="off"
      disabled={disabled}
      {...register(id)}
    />
    {error && <p className="text-destructive text-sm">{error}</p>}
  </div>
);

const SocialButton = ({ icon: Icon, children, ...props }) => (
  <Button variant="outline" type="button" {...props}>
    {props.disabled ? (
      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
    ) : (
      <Icon className="mr-2 h-4 w-4" />
    )}
    {children}
  </Button>
);

// Organisms
const EmailPasswordForm = ({
  formState,
  handleSubmit,
  register,
  handleLogin,
  t,
}) => (
  <form onSubmit={handleSubmit(handleLogin)}>
    <div className="grid gap-2">
      <FormField
        label={t("PAGES:AUTH_PAGE.email", { defaultValue: "Email" })}
        id="email"
        type="email"
        placeholder={t("PAGES:AUTH_PAGE.placeholderemail", {
          defaultValue: "name@example.com",
        })}
        disabled={formState.isSubmitting}
        register={register}
        error={formState.errors.email?.message}
      />
      <FormField
        label={t("PAGES:AUTH_PAGE.password", { defaultValue: "Senha" })}
        id="password"
        type="password"
        placeholder={t("PAGES:AUTH_PAGE.placeholderpassword", {
          defaultValue: "********",
        })}
        disabled={formState.isSubmitting}
        register={register}
        error={formState.errors.password?.message}
      />
      <Button disabled={formState.isSubmitting} className="mt-2">
        {formState.isSubmitting && (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        )}
        {t("PAGES:AUTH_PAGE.signIn", { defaultValue: "Entrar" })}
      </Button>
    </div>
  </form>
);

const GoogleLoginSection = ({ formState, t }) => (
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

// Template
interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const { formState, handleSubmit, register, handleLogin } = useLogin();
  const { t } = useTranslation(["PAGES"]);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <EmailPasswordForm
        formState={formState}
        handleSubmit={handleSubmit}
        register={register}
        handleLogin={handleLogin}
        t={t}
      />
      <GoogleLoginSection formState={formState} t={t} />
    </div>
  );
}
