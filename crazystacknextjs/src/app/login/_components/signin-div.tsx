import { LoginForm } from "@/slices/general/features/login";
import Link from "next/link";

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
      <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
        Clicando em continuar, você concorda com nossos{" "}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Termos de serviço
        </Link>{" "}
        e{" "}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Política de privacidade
        </Link>
      </p>
    </div>
  );
};
