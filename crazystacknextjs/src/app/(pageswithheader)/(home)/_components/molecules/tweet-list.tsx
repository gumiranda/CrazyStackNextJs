"use client";
import type { TweetProps } from "@/slices/belezix/entidades/tweet/tweet.model";
import { AnimatePresence } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { TweetCard } from "./tweet-card";

export function TweetList({
  initialTweets,
  countTweets,
}: {
  initialTweets: any[];
  countTweets: number;
}) {
  const [tweets, setTweets] = useState(initialTweets);
  const [canReply, setCanReply] = useState<TweetProps | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastTweetElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && tweets.length < countTweets) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, tweets.length, countTweets],
  );
  const handleChangeCanReply = (tweetId: string) => {
    setCanReply(tweets.find((tweet) => tweet._id === tweetId) || null);
  };
  return (
    <AnimatePresence>
      {tweets.map((tweet: TweetProps, index: number) => (
        <TweetCard
          ref={index === tweets.length - 1 ? lastTweetElementRef : null}
          key={tweet._id}
          tweet={tweet}
          canReply={canReply?._id === tweet?._id}
          handleChangeCanReply={handleChangeCanReply}
        />
      ))}
    </AnimatePresence>
  );
}
