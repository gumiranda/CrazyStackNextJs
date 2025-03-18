"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { TweetCard } from "./tweet-card";
import type { TweetProps } from "@/slices/belezix/entidades/tweet/tweet.model";
import { getTweets } from "@/slices/belezix/entidades/tweet/tweet.api";
import { parseCookies } from "nookies";
import { motion, AnimatePresence } from "framer-motion";
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
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && tweets.length < countTweets) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, tweets.length, countTweets],
  );

  const handleChangeCanReply = ({ tweet }: { tweet: TweetProps }) => {
    if (canReply?._id === tweet?._id) {
      setCanReply(null);
      return;
    }
    setCanReply(tweet);
  };

  useEffect(() => {
    const loadMoreTweets = async () => {
      if (loading || tweets.length >= countTweets) return;
      setLoading(true);
      setError(null);
      try {
        const cookies = parseCookies();
        const { tweets: newTweets } = await getTweets(page, cookies, {
          sortBy: "createdAt",
          typeSort: "desc",
          tweetId: "null",
        });

        setTweets((prevTweets) => [
          ...new Set(prevTweets?.concat?.(newTweets)),
        ]);
      } catch (error) {
        console.error("Error loading more tweets:", error);
        setError("Failed to load tweets. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    if (page > 1) {
      loadMoreTweets();
    }
  }, [page, loading, tweets.length, countTweets]);

  return (
    <AnimatePresence>
      {tweets.map((tweet: TweetProps, index: number) => (
        <TweetCard
          key={tweet?._id + index}
          ref={index === tweets.length - 1 ? lastTweetElementRef : null}
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
