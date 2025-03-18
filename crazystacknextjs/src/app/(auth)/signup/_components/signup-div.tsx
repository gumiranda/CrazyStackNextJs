import { SignUpForm } from "@/slices/general/features/signup";
import Link from "next/link";
import { TermsAndConditions } from "../../_components/terms-and-conditions";

export const SignUpDiv = () => {
  return (
    <div className="mt-8 lg:mt-0 p-8">
      <div
        className="mx-auto flex w-full flex-col justify-center
       space-y-6 sm:w-[350px]"
      >
        <div className="flex flex-col space-y-2 text-center mb-4">
          <h1 className="text-2xl font-semibold tracking-tight font-inter">
            Criar conta
          </h1>
          <p className="text-sm text-muted-foreground font-inter">
            Digite seu email e senha para criar sua conta
          </p>
        </div>
      </div>
      <SignUpForm />
      <TermsAndConditions />
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Já tem uma conta?{" "}
        <Link
          href="/signup"
          className="font-semibold text-primary hover:underline"
        >
          Entre aqui
        </Link>
      </p>
    </div>
  );
};
