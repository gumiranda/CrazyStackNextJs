"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Repeat2 } from "lucide-react";

interface Tweet {
  id: string;
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
}

const initialTweets: Tweet[] = [
  {
    id: "1",
    user: {
      name: "John Doe",
      handle: "@johndoe",
      avatar:
        "https://images.unsplash.com/photo-1619367901998-73b3a70b3898?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    content: "Just had a great day at the beach! 🏖️",
    image:
      "https://images.unsplash.com/photo-1619367901998-73b3a70b3898?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likes: 15,
    retweets: 5,
    replies: 3,
  },
  {
    id: "2",
    user: {
      name: "Jane Smith",
      handle: "@janesmith",
      avatar:
        "https://images.unsplash.com/photo-1619367901998-73b3a70b3898?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    content: "Working on a new project. Can't wait to share it with you all!",
    likes: 10,
    retweets: 2,
    replies: 1,
  },
];

export function TweetList() {
  const [tweets, setTweets] = useState(initialTweets);

  const handleLike = (id: string) => {
    setTweets(
      tweets.map((tweet) =>
        tweet.id === id ? { ...tweet, likes: tweet.likes + 1 } : tweet,
      ),
    );
  };

  const handleRetweet = (id: string) => {
    setTweets(
      tweets.map((tweet) =>
        tweet.id === id ? { ...tweet, retweets: tweet.retweets + 1 } : tweet,
      ),
    );
  };

  return (
    <div className="space-y-4 flex flex-col justify-center">
      {tweets.map((tweet) => (
        <div
          key={tweet.id}
          className="w-full self-center p-4 rounded-lg shadow"
        >
          <div className="flex items-center mb-2">
            <Avatar className="w-12 h-12 mr-4">
              <img
                src={tweet.user.avatar || "/placeholder.svg"}
                alt={tweet.user.name}
              />
            </Avatar>
            <div>
              <h3 className="font-bold">{tweet.user.name}</h3>
              <p className="text-gray-500">{tweet.user.handle}</p>
            </div>
          </div>
          <p className="mb-2">{tweet.content}</p>
          {tweet.image && (
            <img
              src={tweet.image || "/placeholder.svg"}
              alt="Tweet image"
              className="max-w-full rounded-lg mb-2"
            />
          )}
          <div className="flex justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => console.log("Reply")}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              {tweet.replies}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRetweet(tweet.id)}
            >
              <Repeat2 className="w-4 h-4 mr-2" />
              {tweet.retweets}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLike(tweet.id)}
            >
              <Heart className="w-4 h-4 mr-2" />
              {tweet.likes}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
