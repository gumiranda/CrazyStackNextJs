import { whitelabel } from "@/application/whitelabel";
import { SignUpForm } from "@/slices/general/features/signup/signup-form";
import type { Metadata } from "next";
import { SignUpDiv } from "./_components/signup-div";
import { SideDiv } from "../_components/side-div";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Cadastro`,
  description: `Página de cadastro do ${whitelabel.systemName}. Faça seu cadastro para acessar o sistema.`,
};

export default function SignUpPage() {
  return (
    <div className="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <SideDiv />
      <SignUpDiv />
    </div>
  );
}
