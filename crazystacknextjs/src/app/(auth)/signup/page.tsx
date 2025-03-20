import { whitelabel } from "@/application/whitelabel";
import { SignUpForm } from "@/slices/general/features/signup/signup-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Cadastro`,
  description: `Página de cadastro do ${whitelabel.systemName}. Faça seu cadastro para acessar o sistema.`,
};

export default function SignUpPage() {
  return <SignUpForm />;
}
