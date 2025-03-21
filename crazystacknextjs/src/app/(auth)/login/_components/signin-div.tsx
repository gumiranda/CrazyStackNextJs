import { LoginForm } from "@/slices/general/features/login";
import Link from "next/link";
import { TermsAndConditions } from "../../_components/terms-and-conditions";

export const SignInDiv = () => {
  return (
    <div className="mt-8 lg:mt-0 p-8">
      <div
        className="mx-auto flex w-full flex-col justify-center
       space-y-6 sm:w-[350px]"
      >
        <div className="flex flex-col space-y-2 text-center mb-4">
          <h1 className="text-2xl font-semibold tracking-tight font-inter">
            Entrar na sua conta
          </h1>
          <p className="text-sm text-muted-foreground font-inter">
            Entre com seu email e senha para acessar sua conta
          </p>
        </div>
      </div>
      <LoginForm />
      <TermsAndConditions />
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Ainda não tem uma conta?{" "}
        <Link
          href="/signup"
          className="font-semibold text-primary hover:underline"
        >
          Cadastre-se aqui
        </Link>
      </p>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Ainda não tem uma conta?{" "}
        <Link
          href="/signup"
          className="font-semibold text-primary hover:underline"
        >
          Cadastre-se aqui
        </Link>
      </p>
    </div>
  );
};
