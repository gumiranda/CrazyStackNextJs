import { SubHeader } from "./_components/organisms/subheader";
import type { Metadata } from "next";
import { whitelabel } from "@/application/whitelabel";
import { getCookies, parseCookies } from "@/shared/libs/utils";
import { getOwnersPublic } from "@/slices/belezix/entidades/owner/owner.api";
import { getRequests } from "@/slices/belezix/entidades/request/request.api";
import { startOfDay } from "date-fns";
import { HorizontalList } from "../_components/templates/horizontal-list";

export const metadata: Metadata = {
  title: `${whitelabel.systemName} | Agendamentos Online`,
  description: `Página de inicial do ${whitelabel.systemName}. Aqui você pode agendar com os melhores estabelecimentos da cidade.`,
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
async function handleRequests(cookies: any) {
  try {
    const { requests, totalCount = 0 } = !cookies
      ? { requests: [], totalCount: 0 }
      : await getRequests(1, cookies, {
          initDate: startOfDay(new Date()).toISOString(),
          sortBy: "initDate",
          typeSort: "desc",
        });
    return { requests, totalCount };
  } catch (error: any) {
    return { requests: [], totalCount: 0 };
  }
}
export default async function Page() {
  const cookies = await getParsedCookies();
  const popularOwners = await getOwnersPublic(1, cookies, {
    sortBy: "appointmentsTotal",
    typeSort: "desc",
  });
  const lastOwners = await getOwnersPublic(1, cookies, {
    sortBy: "createdAt",
    typeSort: "desc",
  });
  const owners = Array.isArray(popularOwners?.owners)
    ? popularOwners?.owners
    : [];
  const newOwners = Array.isArray(lastOwners?.owners) ? lastOwners?.owners : [];
  const { requests, totalCount } = await handleRequests(cookies);
  return (
    <div className="flex flex-col xl:flex-row lg:justify-around">
      <div className="w-full lg:w-auto">
        <SubHeader />
        <HorizontalList
          title="Agendamentos"
          array={requests}
          type="appointment"
          widthCard={342}
        />
      </div>
      <div className="w-full lg:w-auto">
        <HorizontalList
          title="Novos"
          array={newOwners}
          type="owner"
          widthCard={200}
        />
        <HorizontalList
          title="Populares"
          array={owners}
          type="owner"
          widthCard={200}
        />
      </div>
    </div>
  );
}
