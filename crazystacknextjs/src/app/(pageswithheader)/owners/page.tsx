import { Search } from "../_components/molecules/search";
import { getCookies, parseCookies } from "@/shared/libs/utils";
import { getOwnersPublic } from "@/slices/belezix/entidades/owner/owner.api";
import type { Metadata } from "next";
import { whitelabel } from "@/application/whitelabel";
import { OwnerItem } from "@/slices/belezix/entidades/owner/ui/owner-item";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Estabelecimentos`,
  description: `Página de listagem de estabelecimentos do ${whitelabel.systemName}. Aqui você pode agendar com os melhores estabelecimentos da cidade.`,
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
async function handleOwners(filter: any) {
  try {
    const cookies = await getParsedCookies();

    const { owners = [], totalCount = 0 } = await getOwnersPublic(
      1,
      cookies,
      filter,
    );

    return { owners, totalCount };
  } catch (error) {
    return null;
  }
}
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const name = (await searchParams).title;
  const service = (await searchParams).service;
  const filter: any = { limitPerPage: 100 };
  if (name && name?.length > 0) {
    filter.name = name;
  }
  const result = await handleOwners(filter);
  if (!result) return null;
  const { owners = [] } = result;
  return (
    <>
      <div className="my-6 px-5">
        <Search />
      </div>
      <div className="px-5">
        {(name || service) && (
          <>
            {" "}
            <h2>Resultados para &quot;{name || service}</h2>
            &quot;
          </>
        )}

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {owners?.map?.((owner: any) => (
            <OwnerItem key={owner._id} item={owner} />
          ))}
        </div>
      </div>
    </>
  );
}
