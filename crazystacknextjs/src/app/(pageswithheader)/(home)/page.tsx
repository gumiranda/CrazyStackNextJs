import type { Metadata } from "next";
import { whitelabel } from "@/application/whitelabel";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Agendamentos Online`,
  description: `Página de inicial do ${whitelabel.systemName}. Aqui você pode agendar com os melhores estabelecimentos da cidade.`,
};
export default function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
