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
      <div className="grid gap-4">
        <FormField
          label={t("PAGES:AUTH_PAGE.name", { defaultValue: "Nome" })}
          id="name"
          type="text"
          placeholder={t("PAGES:AUTH_PAGE.placeholdername", {
            defaultValue: "Seu nome completo",
          })}
          disabled={formState.isSubmitting}
          register={register}
          error={formState.errors.name?.message?.toString()}
        />
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
          label={t("PAGES:AUTH_PAGE.phone", { defaultValue: "Telefone" })}
          id="phone"
          type="tel"
          placeholder={t("PAGES:AUTH_PAGE.placeholderphone", {
            defaultValue: "(00) 00000-0000",
          })}
          disabled={formState.isSubmitting}
          register={register}
          error={formState.errors.phone?.message?.toString()}
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
        <FormField
          label={t("PAGES:AUTH_PAGE.passwordConfirmation", {
            defaultValue: "Confirmar Senha",
          })}
          id="passwordConfirmation"
          type="password"
          placeholder={t("PAGES:AUTH_PAGE.placeholderpasswordConfirmation", {
            defaultValue: "********",
          })}
          disabled={formState.isSubmitting}
          register={register}
          error={formState.errors.passwordConfirmation?.message?.toString()}
        />
        <Button disabled={formState.isSubmitting} className="mt-2">
          {formState.isSubmitting && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          {t("PAGES:AUTH_PAGE.signUp", { defaultValue: "Criar conta" })}
        </Button>
      </div>
    </form>
  );
};
