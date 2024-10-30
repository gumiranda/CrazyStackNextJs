import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import type { ReactNode } from "react";

export const SocialButton = ({
  icon: Icon,
  children,
  ...props
}: {
  icon: React.ComponentType<any>;
  children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <Button variant="outline" type="button" {...props}>
    {props.disabled ? (
      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
    ) : (
      <Icon className="mr-2 h-4 w-4" />
    )}
    {children}
  </Button>
);
