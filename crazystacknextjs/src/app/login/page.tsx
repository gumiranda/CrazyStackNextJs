import type { Metadata } from "next";
import { whitelabel } from "@/application/whitelabel";
import { SideDiv } from "./_components/side-div";
import { SignInDiv } from "./_components/signin-div";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Entrar`,
  description: `Página de login do ${whitelabel.systemName}. Faça login para acessar o sistema.`,
};
export default function Login() {
  return (
    <div
      className="container relative h-[800px] flex-col items-center justify-center
    md:grid lg:max-w-none lg:grid-cols-2 lg:px-0
    "
    >
      <SideDiv />
      <SignInDiv />
    </div>
  );
}
