import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { FormField } from "@/shared/ui/atoms/form-field";
import { FieldValues, FormState, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface EmailPasswordFormProps {
  formState: FormState<FieldValues>;
  handleSubmit: (
    callback: SubmitHandler<FieldValues>,
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  register: any;
  handleSignUp: any;
}

export const EmailPasswordForm = ({
  formState,
  handleSubmit,
  register,
  handleSignUp,
}: EmailPasswordFormProps) => {
  const { t } = useTranslation(["PAGES"]);
  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
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
          error={formState.errors.email?.message?.toString()}
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
          error={formState.errors.password?.message?.toString()}
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
};
