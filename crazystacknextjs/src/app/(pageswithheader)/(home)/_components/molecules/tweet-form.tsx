"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, ImageIcon, Smile, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { parseCookies } from "nookies";
import { uploadPhoto } from "@/slices/belezix/entidades/photo/photo.api";
import { addTweet } from "@/slices/belezix/entidades/tweet/tweet.api";
import { useAuth } from "@/shared/libs/contexts/AuthContext";
import EmojiPicker from "./emoji-picker";
import { toast } from "sonner";

const MAX_TWEET_LENGTH = 280;

export function TweetForm({ tweetId }: { tweetId?: string }) {
  const { user } = useAuth();
  const [tweet, setTweet] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formDataImage, setFormDataImage] = useState<FormData | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const cookies = parseCookies();
      try {
        let photo;
        if (formDataImage) {
          photo = await uploadPhoto({ formDataImage, cookies });
        }
        const response = await addTweet({
          tweet: {
            userSlug: user?.name,
            body: tweet,
            image: photo?._id,
            tweetId,
          },
          cookies,
        });
        if (response?._id) {
          toast.success(
            tweetId
              ? "Resposta enviada com sucesso!"
              : "Post enviado com sucesso!",
          );
        }
      } catch (err) {}
      setTweet("");
      setImage(null);
    } catch (err) {
      setError("Failed to submit tweet. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const formData = new FormData();

    if (file) {
      formData.append("file", file);
      setFormDataImage(formData);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setTweet(tweet + emoji);
    setShowEmojiPicker(false);
  };

  const remainingChars = MAX_TWEET_LENGTH - tweet.length;
  const isOverLimit = remainingChars < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto mt-10 mb-6 p-4 rounded-lg shadow-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="w-full flex flex-col md:flex-row items-start">
          <Avatar className="w-12 h-12 md:ml-0 md:mr-4 mb-4 md:mb-0">
            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
            <AvatarFallback>
              {user?.name?.charAt?.(0)?.toUpperCase?.() ?? "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow space-y-2 min-w-full md:min-w-fit">
            <Textarea
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
              placeholder={
                tweetId
                  ? "Escreva sua resposta..."
                  : "Compartilhe seus momentos de beleza e autocuidado..."
              }
              className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              rows={3}
              maxLength={MAX_TWEET_LENGTH}
              aria-label={tweetId ? "Reply content" : "Tweet content"}
            />
            <AnimatePresence>
              {image && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative mt-2"
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt="Uploaded preview"
                    className="max-w-full h-auto rounded-lg"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={removeImage}
                    aria-label="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
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
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
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
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm"
          >
            {error}
          </motion.p>
        )}
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="default"
            disabled={tweet.trim().length === 0 || isOverLimit || isLoading}
            className="px-6 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-200"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {tweetId ? "Respondendo..." : "Postando..."}
              </>
            ) : tweetId ? (
              "Responder"
            ) : (
              "Postar"
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
