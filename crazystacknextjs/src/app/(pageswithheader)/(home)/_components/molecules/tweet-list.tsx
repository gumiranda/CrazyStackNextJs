"use client";
import type { TweetProps } from "@/slices/belezix/entidades/tweet/tweet.model";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { TweetCard } from "./tweet-card";
import { Loader2 } from "lucide-react";

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
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex justify-center items-center py-4"
        >
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span className="ml-2">Loading more tweets...</span>
        </motion.div>
      )}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-red-500 text-center py-4"
        >
          {error}
        </motion.div>
      )}
      {!loading && tweets.length >= countTweets && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-4 text-gray-500"
        >
          No more tweets to load.
        </motion.div>
      )}
    </AnimatePresence>
  );
}
