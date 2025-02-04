import { SubHeader } from "./_components/organisms/subheader";
import type { Metadata } from "next";
import { whitelabel } from "@/application/whitelabel";
import { getCookies, parseCookies } from "@/shared/libs/utils";
import { getOwnersPublic } from "@/slices/belezix/entidades/owner/owner.api";
import { getRequests } from "@/slices/belezix/entidades/request/request.api";
import { startOfDay } from "date-fns";
import { HorizontalList } from "../_components/templates/horizontal-list";
import { TweetForm } from "./_components/molecules/tweet-form";
import { TweetList } from "./_components/molecules/tweet-list";
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
    <>
      <main className="min-h-screen flex flex-col md:flex-row justify-center mx-auto max-w-7xl">
        <section
          className="flex flex-col w-full
      px-3 border-r-2 border-gray-900"
        >
          <SubHeader />{" "}
          <HorizontalList
            title="Agendamentos"
            array={requests}
            type="appointment"
            widthCard={342}
          />
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
        </section>
        <section className="flex flex-col w-full">
          <div className="m-10">
            <h2 className="text-xl font-bold font-inter">Feed</h2>
            <p>
              Veja o que as pessoas estão falando sobre o Belezix e participe
            </p>
            <TweetForm />
            <TweetList />
          </div>
        </section>
      </main>
    </>
  );
}
