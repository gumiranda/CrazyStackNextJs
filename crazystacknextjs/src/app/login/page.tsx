import type { Metadata } from "next";
import { whitelabel } from "@/application/whitelabel";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Entrar`,
  description: `Página de login do ${whitelabel.systemName}. Faça login para acessar o sistema.`,
};
export default function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
