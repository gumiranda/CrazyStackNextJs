import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/shared/libs/contexts/AuthContext";
import { Heart, MessageCircle, Repeat2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export const TweetCard = ({
  tweet,
  canReply = false,
  handleChangeCanReply,
  ref,
}: any) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const isReply = !!tweet?.tweetId;
  const [likeCount, setLikeCount] = useState(
    Number(tweet?.tweetlike?.total ?? 0),
  );
  const [isLiked, setIsLiked] = useState(
    tweet?.tweetlike?.find?.((item: any) => item?.createdById === user?._id),
  );
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  useEffect(() => {
    setLikeCount(Number(tweet?.tweetlike?.total ?? 0));
    setIsLiked(
      tweet?.tweetlike?.find?.((item: any) => item?.createdById === user?._id),
    );
  }, [tweet, user]);
  const handleLikeClick = useCallback(async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to like tweets.",
        variant: "destructive",
      });
      return;
    }
  }, [user, tweet]);
  return (
    <Card className="w-full" ref={ref}>
      <CardHeader>
        <Avatar>
          <AvatarImage
            src={tweet?.createdBy?.photo}
            alt={tweet?.createdBy?.name}
          />
          <AvatarFallback>
            {tweet?.createdBy?.slug?.charAt?.(0)?.toUpperCase?.()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">@{tweet?.createdBy?.slug}</h3>
              <p className="text-sm text-gray-400">{tweet?.createdBy?.name}</p>
            </div>
            <p className="text-sm text-gray-400">{tweet?.distanceNow}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p
          className="mb-4 text-lg leading-relaxed line-clamp-6"
          style={{ wordBreak: "break-word" }}
        >
          {tweet?.body}
        </p>
        {tweet?.image && (
          <img
            src={tweet?.image}
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
            onClick={() => {
              if (!user) {
                toast({
                  title: "Authentication required",
                  description: "Please log in to reply tweets.",
                  variant: "destructive",
                });
                return;
              }
              handleChangeCanReply({ tweet });
            }}
          >
            <MessageCircle className="w-5 h-5" />
            {tweet?.replies ?? 0}
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
            className={`flex items-center space-x-2 transition-colors ${
              isLiked
                ? "text-red-500 hover:text-red-600"
                : "text-gray-500 hover:text-red-500"
            }`}
            onClick={handleLikeClick}
            disabled={isLikeLoading}
          >
            <Heart
              className={`w-5 h-5 transition-transform duration-300 ${
                isLiked ? "fill-current scale-110" : ""
              }`}
            />
            <span className="font-semibold">{likeCount}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
