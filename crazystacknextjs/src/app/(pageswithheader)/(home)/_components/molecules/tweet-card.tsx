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
import { TweetForm } from "./tweet-form";
import { toggleLike } from "@/slices/belezix/entidades/tweet/tweet.api";
import { useAuth } from "@/shared/libs/contexts/AuthContext";
import { parseCookies } from "nookies";
import { useState } from "react";

export const TweetCard = ({
  tweet,
  canReply = false,
  handleChangeCanReply,
}: any) => {
  const { user } = useAuth();
  const isReply = !!tweet?.tweetId;
  const [likePlus, setLikePlus] = useState(0);
  const iLike = tweet?.tweetlike?.find?.(
    (item: any) => item?.createdById === user?._id,
  );
  const [iLiked, setiLiked] = useState(iLike);
  console.log(iLiked);
  return (
    <Card key={tweet?._id} className="w-full">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <Avatar className="w-12 h-12">
          <AvatarImage
            src={tweet?.createdBy?.photo}
            alt={tweet?.createdBy?.name}
          />
          <AvatarFallback>{tweet?.createdBy?.slug?.charAt?.(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">@{tweet?.createdBy?.slug}</h3>
              <p className="text-sm text-gray-500">{tweet?.createdBy?.name}</p>
            </div>
            <p className="text-sm text-gray-500">{tweet?.distanceNow}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-lg leading-relaxed">{tweet?.body}</p>
        {tweet?.image && (
          <img
            src={tweet?.image || "/placeholder.svg"}
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
            onClick={() => handleChangeCanReply({ tweet })}
          >
            <MessageCircle className="w-5 h-5" />
            <span>{tweet?.replies}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors"
            onClick={() => {}}
          >
            <Repeat2 className="w-5 h-5" />
            <span>{tweet?.retweets}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors"
            onClick={async () => {
              await toggleLike({
                tweetlike: { tweetId: tweet?._id, userSlug: user?.slug },
                cookies: parseCookies(),
              });
              setLikePlus((prev) => (iLiked ? prev - 1 : prev + 1));
              setiLiked(!iLiked);
            }}
          >
            <Heart className="w-5 h-5" />
            <span>{Number(tweet?.tweetlike?.total ?? 0) + likePlus}</span>
          </Button>
        </div>
      </CardFooter>
      {canReply && (
        <div className="m-4 rounded-lg shadow-md max-w-2xl">
          <TweetForm tweetId={tweet?._id} />
        </div>
      )}
    </Card>
  );
};
