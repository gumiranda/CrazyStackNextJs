import { whitelabel } from "@/application/whitelabel";
import { cn } from "@/lib/utils";
import NextLink from "next/link";

export const Logo = ({ className = "", haveLink = true }) => {
  if (haveLink) {
    return (
      <NextLink href="/">
        <SystemNameText className={className} />
      </NextLink>
    );
  }
  return <SystemNameText className={className} />;
};
export const SystemNameText = ({ className }: { className?: string }) => {
  return (
    <h1
      className={cn(
        "dark:text-white text-primary font-logo text-center font-bold tracking-tight mt-1 leading-tight text-4xl sm:text-5xl",
        className,
      )}
    >
      {whitelabel.systemName}
    </h1>
  );
};
