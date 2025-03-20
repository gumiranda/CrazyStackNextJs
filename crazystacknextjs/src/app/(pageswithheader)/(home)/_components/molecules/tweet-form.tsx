"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/shared/libs/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { ImageIcon, Smile } from "lucide-react";
import { useRef, useState } from "react";
import { EmojiPicker } from "./emoji-picker";
const MAX_TWEET_LENGTH = 280;

export function TweetFormContainer({ tweetId }: { tweetId?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto mt-10 mb-6 rounded-lg shadow-md"
    >
      <TweetForm tweetId={tweetId} />
    </motion.div>
  );
}
export function TweetForm({ tweetId }: { tweetId?: string }) {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const [tweet, setTweet] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };
  const remainingChars = MAX_TWEET_LENGTH - tweet.length;
  const isOverLimit = remainingChars < 0;

  const removeImage = () => {};
  const handleImageUpload = () => {};
  const handleEmojiSelect = () => {};
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Avatar>
          <AvatarImage src={"/barba.svg"} />
          <AvatarFallback>
            {user?.name?.charAt?.(0)?.toUpperCase?.() ?? "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-grow space-y-2 min-w-full md:min-w-fit">
          <Textarea
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
            placeholder={
              tweetId ? "Escreva sua resposta..." : "Compartilhe seus momentos"
            }
            className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            rows={3}
            maxLength={MAX_TWEET_LENGTH}
            aria-label={tweetId ? "Reply content" : "Tweet content"}
          />
          <ImageTweet image={image} removeImage={removeImage} />
          <div className="flex items-center justify-between relative">
            <div className="flex space-x-2">
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Add image"
              >
                <ImageIcon className="w-4 h-4" />
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
                aria-label="Upload image"
              />
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={() => {
                  setShowEmojiPicker(!showEmojiPicker);
                }}
                aria-label="Add emoji"
              >
                <Smile className="w-4 h-4" />
              </Button>
            </div>
            {showEmojiPicker && (
              <div ref={emojiPickerRef} className="absolute mt-2 z-10">
                <EmojiPicker onEmojiSelect={handleEmojiSelect} />
              </div>
            )}
            <AnimatePresence>
              {tweet.length > 0 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`text-sm ${
                    isOverLimit
                      ? "text-red-500"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {remainingChars}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </form>
  );
}
export const ImageTweet = ({ image, removeImage }: any) => {
  return <></>;
};
