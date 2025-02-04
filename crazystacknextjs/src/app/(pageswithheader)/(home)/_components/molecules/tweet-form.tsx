"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";

export function TweetForm() {
  const [tweet, setTweet] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the tweet to your backend
    console.log("Tweet submitted:", tweet);
    setTweet("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10 mb-6">
      <div className="flex items-start space-x-4">
        <div className="flex-grow">
          <Textarea
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
            placeholder="What's happening?"
            className="w-full mb-2"
            rows={3}
          />
          <Button type="submit" disabled={tweet.trim().length === 0}>
            Tweet
          </Button>
        </div>
      </div>
    </form>
  );
}
