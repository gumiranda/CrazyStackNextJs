import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { ToggleTheme } from "@/components/ui/toggle-theme";
import { Logo } from "@/shared/ui/atoms";
import { MenuIcon } from "lucide-react";
import { SidebarSheet } from "../molecules/sidebar-sheet";

export const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <div className="h-18 w-120">
          <Logo />
        </div>
        <div className="flex">
          <ToggleTheme className="mr-2" />
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SidebarSheet
              quickSearchOptions={[
                {
                  title: "Acabamento",
                  imageUrl: "/acabamento.svg",
                },
                {
                  title: "Cabelo",
                  imageUrl: "/cabelo.svg",
                },
                {
                  title: "Barba",
                  imageUrl: "/barba.svg",
                },
                {
                  title: "Massagem",
                  imageUrl: "/massagem.svg",
                },
                {
                  title: "Sobrancelha",
                  imageUrl: "/sobrancelha.svg",
                },
              ]}
            />
          </Sheet>
        </div>
      </CardContent>
    </Card>
  );
};
