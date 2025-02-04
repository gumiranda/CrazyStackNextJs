"use client";

import { useState } from "react";
import { TweetCard } from "./tweet-card";

interface Tweet {
  _id: string;
  user: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  image?: string;
  likes: number;
  retweets: number;
  replies: number;
  createdAt: Date;
}

const initialTweets: Tweet[] = [
  {
    _id: "1",
    user: {
      name: "John Doe",
      handle: "@johndoe",
      avatar:
        "https://images.unsplash.com/photo-1619367901998-73b3a70b3898?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    content:
      "Just had a great day at the beach! 🏖️ The sun, sand, and waves were perfect. Can't wait to go back soon!",
    image:
      "https://images.unsplash.com/photo-1619367901998-73b3a70b3898?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likes: 15,
    retweets: 5,
    replies: 3,
    createdAt: new Date(2023, 5, 15, 14, 30),
  },
  {
    _id: "2",
    user: {
      name: "Jane Smith",
      handle: "@janesmith",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    content:
      "Working on a new project. Can't wait to share it with you all! It's going to revolutionize the way we think about social media.",
    likes: 10,
    retweets: 2,
    replies: 1,
    createdAt: new Date(2023, 5, 16, 9, 45),
  },
];

export function TweetList() {
  const [tweets, setTweets] = useState(initialTweets);
  const [canReply, setCanReply] = useState<Tweet | null>(null);
  const handleChangeCanReply = ({ tweet }: { tweet: Tweet }) => {
    if (canReply?._id === tweet?._id) {
      setCanReply(null);
      return;
    }
    setCanReply(tweet);
  };
  return (
    <>
      {tweets.map((tweet) => (
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
