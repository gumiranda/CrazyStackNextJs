"use client";

import { useState } from "react";
import { TweetCard } from "./tweet-card";
import type { TweetProps } from "@/slices/belezix/entidades/tweet/tweet.model";

export function TweetList({
  initialTweets,
  countTweets,
}: {
  initialTweets: any;
  countTweets: number;
}) {
  const [tweets, setTweets] = useState(initialTweets);
  const [canReply, setCanReply] = useState<TweetProps | null>(null);
  const handleChangeCanReply = ({ tweet }: { tweet: any }) => {
    if (canReply?._id === tweet?._id) {
      setCanReply(null);
      return;
    }
    setCanReply(tweet);
  };
  return (
    <>
      {tweets?.map?.((tweet: TweetProps) => (
        <TweetCard
          tweet={tweet}
          key={tweet?._id}
          canReply={canReply?._id === tweet?._id}
          handleChangeCanReply={handleChangeCanReply}
        />
      ))}
    </>
  );
}
