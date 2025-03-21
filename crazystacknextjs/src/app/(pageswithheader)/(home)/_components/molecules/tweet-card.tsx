import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/shared/libs/contexts/AuthContext";
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
    }
  }, []);
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
    </Card>
  );
};
