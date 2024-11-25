"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAuth } from "@/shared/libs/contexts/AuthContext";
import {
  BriefcaseBusiness,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SignInDiv } from "@/app/(auth)/login/_components/signin-div";

type Props = {
  quickSearchOptions: any[];
};
export const SidebarSheet = ({ quickSearchOptions }: Props) => {
  const { user, userPhoto, logout } = useAuth();
  const router = useRouter();
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>
      <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
        {user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={userPhoto?.url}></AvatarImage>
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user.name.toUpperCase().charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold">{user.name}</p>
              <p className="text-xs">{user.email}</p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-bold">Olá, faça seu login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%]">
                <DialogTitle>Faça seu login</DialogTitle>
                <SignInDiv />
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        <SheetClose asChild>
          <Button variant="ghost" className="justify-start gap-2" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              Início
            </Link>
          </Button>
        </SheetClose>
        {user && (
          <Button variant="ghost" className="justify-start gap-2" asChild>
            <Link href="/appointments">
              <HomeIcon size={18} />
              Agendamentos
            </Link>
          </Button>
        )}
        <Button variant="ghost" className="justify-start gap-2" asChild>
          <Link href="/business">
            <BriefcaseBusiness size={18} />
            Cadastre seu negócio
          </Link>
        </Button>
      </div>
      <div className="flex flex-col gap-2 border-b border-solid py-5">
        {quickSearchOptions?.map?.((option) => (
          <SheetClose key={option.title} asChild>
            <Button className="justify-start gap-2" variant="ghost" asChild>
              <Link href={`/owners?service=${option.title}`}>
                <Image
                  alt={option.title}
                  src={option.imageUrl}
                  height={18}
                  width={18}
                />
                {option.title}
              </Link>
            </Button>
          </SheetClose>
        ))}
      </div>
      {user && (
        <div className="flex flex-col gap-2 py-5">
          <Button
            variant="ghost"
            className="justify-start gap-2"
            onClick={() => {
              logout?.();
              router.push("/login");
            }}
          >
            <LogOutIcon size={18} />
            Sair da conta
          </Button>
        </div>
      )}
    </SheetContent>
  );
};
