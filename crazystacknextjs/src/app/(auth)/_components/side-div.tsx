import { ToggleTheme } from "@/components/ui/toggle-theme";
import { Logo } from "@/shared/ui/atoms/logo/logo";
export const SideDiv = () => {
  return (
    <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div className="absolute inset-0 bg-zinc-900" />
      <div className="font-logo relative z-20 flex items-center text-xl font-medium">
        <ToggleTheme className="mr-4" />
        <Logo className="text-white" />
      </div>
      <div className="relative z-20 mt-auto">
        <blockquote className="space-y-2">
          <p className="text-lg">
            &ldquo;Frase de efeito aqui, seja original e criativo.Não vale usar
            CHATGPT&rdquo;
          </p>
        </blockquote>
      </div>
    </div>
  );
};
