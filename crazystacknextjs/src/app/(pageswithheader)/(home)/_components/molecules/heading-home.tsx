"use client";
import { useAuth } from "@/shared/libs/contexts/AuthContext";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const HeadingHome = () => {
  const { user } = useAuth();
  return (
    <div className="p-5">
      <h2 className="text-xl font-bold font-inter">
        Olá, {user?.name ?? "bem vindo(a)"}
      </h2>
      <p>
        <span className="capitalize font-inter">
          {format(new Date(), "EEEE, dd", { locale: ptBR })}
        </span>
        <span>&nbsp;de&nbsp;</span>
        <span className="capitalize font-inter">
          {format(new Date(), "MMMM", { locale: ptBR })}
        </span>
      </p>
    </div>
  );
};
