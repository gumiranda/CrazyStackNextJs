"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Heart, MessageCircle, Repeat2, Share2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

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
  createdAt: Date;
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
    id: "2",
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
    <>
      {tweets.map((tweet) => (
        <Card key={tweet.id} className="w-full">
          <CardHeader className="flex flex-row items-center space-x-4 pb-2">
            <Avatar className="w-12 h-12">
              <AvatarImage src={tweet.user.avatar} alt={tweet.user.name} />
              <AvatarFallback>{tweet.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">{tweet.user.name}</h3>
                  <p className="text-sm text-gray-500">{tweet.user.handle}</p>
                </div>
                <p className="text-sm text-gray-500">
                  {formatDistanceToNow(tweet.createdAt, { addSuffix: true })}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-lg leading-relaxed">{tweet.content}</p>
            {tweet.image && (
              <img
                src={tweet.image || "/placeholder.svg"}
                alt="Tweet image"
                className="w-full rounded-lg mb-4 object-cover h-64"
              />
            )}
          </CardContent>
          <CardFooter>
            <div className="flex justify-between w-full">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
                onClick={() => console.log("Reply")}
              >
                <MessageCircle className="w-5 h-5" />
                <span>{tweet.replies}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors"
                onClick={() => handleRetweet(tweet.id)}
              >
                <Repeat2 className="w-5 h-5" />
                <span>{tweet.retweets}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors"
                onClick={() => handleLike(tweet.id)}
              >
                <Heart className="w-5 h-5" />
                <span>{tweet.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
                onClick={() => console.log("Share")}
              >
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
