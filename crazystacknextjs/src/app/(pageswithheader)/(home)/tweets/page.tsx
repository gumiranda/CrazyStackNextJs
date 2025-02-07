import type { Metadata } from "next";
import { whitelabel } from "@/application/whitelabel";
import { getCookies, parseCookies } from "@/shared/libs/utils";

import { getTweets } from "@/slices/belezix/entidades/tweet/tweet.api";
import { TweetFormContainer } from "../_components/molecules/tweet-form";
import { TweetList } from "../_components/molecules/tweet-list";

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

async function handleTweets(cookies: any) {
  try {
    const { tweets, totalCount = 0 } = await getTweets(1, cookies, {
      sortBy: "createdAt",
      typeSort: "desc",
      tweetId: "null",
    });
    return { tweets, totalCount };
  } catch (error: any) {
    return { tweets: [], totalCount: 0 };
  }
}

export default async function Page() {
  const cookies = await getParsedCookies();

  const { tweets, totalCount: countTweets } = await handleTweets(cookies);

  return (
    <>
      <main className="min-h-screen flex flex-col xl:flex-row justify-center items-center mx-auto">
        <section className="flex flex-col w-full max-w-3xl">
          <div className="mx-10 xl:mx-16 my-10">
            <h2 className="text-xl font-bold font-inter">Feed</h2>
            <p>
              Veja o que as pessoas estão falando sobre o Belezix e participe
            </p>

            <TweetFormContainer />
          </div>
          <div className="mx-10 xl:mx-16 flex flex-col items-center justify-center space-y-4">
            <TweetList initialTweets={tweets} countTweets={countTweets} />
          </div>
        </section>
      </main>
    </>
  );
}
