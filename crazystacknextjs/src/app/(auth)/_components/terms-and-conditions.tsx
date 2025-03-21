import Link from "next/link";

export const TermsAndConditions = () => {
  return (
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
  );
};
