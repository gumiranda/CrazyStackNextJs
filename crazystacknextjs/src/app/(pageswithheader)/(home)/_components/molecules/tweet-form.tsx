"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, ImageIcon, Smile, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ca } from "date-fns/locale";
import { parseCookies } from "nookies";
import { uploadPhoto } from "@/slices/belezix/entidades/photo/photo.api";
import { addTweet } from "@/slices/belezix/entidades/tweet/tweet.api";
import { useAuth } from "@/shared/libs/contexts/AuthContext";

const MAX_TWEET_LENGTH = 280;

export function TweetForm() {
  const { user } = useAuth();
  console.log({ user });
  const [tweet, setTweet] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formDataImage, setFormDataImage] = useState<FormData | null>(null);
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
          tweet: { userSlug: user?.name, body: tweet, image: photo?._id },
          cookies,
        });
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

  const remainingChars = MAX_TWEET_LENGTH - tweet.length;
  const isOverLimit = remainingChars < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto mt-10 mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-start space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-grow space-y-2">
            <Textarea
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
              placeholder="What's happening?"
              className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              rows={3}
              maxLength={MAX_TWEET_LENGTH}
              aria-label="Tweet content"
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
            <div className="flex items-center justify-between">
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
                  aria-label="Add emoji"
                >
                  <Smile className="w-4 h-4" />
                </Button>
              </div>
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
            disabled={tweet.trim().length === 0 || isOverLimit || isLoading}
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Tweeting...
              </>
            ) : (
              "Tweet"
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
