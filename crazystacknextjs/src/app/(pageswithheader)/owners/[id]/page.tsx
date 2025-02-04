import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronLeftIcon, MapPinIcon, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhoneItem } from "@/shared/ui/molecules";
import { getOwnerByIdPublic } from "@/slices/belezix/entidades/owner/owner.api";
import { whitelabel } from "@/application/whitelabel";
import { getCookies, parseCookies } from "@/shared/libs/utils";
import { AppointmentService } from "../_components/appointment-service";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Detalhes do Estabelecimento`,
  description: `Página de detalhes de estabelecimentos do ${whitelabel.systemName}. Aqui você pode agendar com os melhores estabelecimentos da cidade.`,
};
async function getParsedCookies() {
  const cookies = await getCookies();
  if (!cookies) {
    return null;
  }
  const parsedCookies = parseCookies(cookies);
  if (!parsedCookies?.["belezixclient.token"]) {
    return null;
  }
  return parsedCookies;
}
export default async function Page({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const cookies = await getParsedCookies();
  const param = await params;
  const ownerId = Array.isArray(param.id) ? param.id[0] : param.id;
  if (!ownerId) {
    throw new Error("Owner ID is missing");
  }
  const owner = await getOwnerByIdPublic(ownerId, cookies);
  if (!owner) {
    return null;
  }
  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Image
          alt={owner.name}
          src={
            owner?.imageUrl ??
            "https://images.unsplash.com/photo-1619367901998-73b3a70b3898?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          fill
          className="object-cover"
        />
        <Button
          variant="secondary"
          className="absolute top-4 left-4"
          size="icon"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>
      </div>
      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{owner.name}</h1>
        <div className="mb-2 flex items-center gap-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{owner?.address ?? "Sem endereço"}</p>
        </div>
        <div className="flex items-center gap-2">
          <StarIcon className="fill-primary text-primary" size={18} />
          <p className="text-sm">4,7 (899 avaliações)</p>
        </div>
      </div>
      <div className="space-y-2 border-b border-solid p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Sobre nós</h2>
        <p className="text-sm">{owner?.description ?? "Não tem descrição"}</p>
      </div>
      <div className="space-y-2 border-b border-solid p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Serviços</h2>
        <div className="space-y-3 max-w-4xl mx-auto">
          {owner?.services?.map?.((service: any, index: number) => (
            <React.Fragment key={service._id ?? index}>
              <AppointmentService
                owner={JSON.parse(JSON.stringify(owner))}
                service={JSON.parse(JSON.stringify(service))}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
      {owner?.phones?.length > 0 && (
        <div className="space-y-3 p-5">
          {owner?.phones?.map?.((phone: any) => (
            <PhoneItem key={phone} phone={phone} />
          ))}
        </div>
      )}
    </div>
  );
}
