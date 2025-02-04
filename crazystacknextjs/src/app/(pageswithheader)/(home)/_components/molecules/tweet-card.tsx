"use client";

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
import { TweetForm } from "./tweet-form";

export const TweetCard = ({ tweet, canReply = true }: any) => {
  const isReply = !!tweet?.tweetId;
  return (
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
            onClick={() => {}}
          >
            <Repeat2 className="w-5 h-5" />
            <span>{tweet.retweets}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors"
            onClick={() => {}}
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
      {canReply && (
        <div className="m-4 rounded-lg shadow-md max-w-2xl">
          <TweetForm tweetId={tweet._id} />
        </div>
      )}
    </Card>
  );
};
