"use client";

import { X } from "lucide-react"; // lucide-react for the close icon
import React from "react";
type BoxSuccessProps = {
  title?: string;
  content: string;
  children?: React.ReactNode;
};

export const BoxError = ({
  title,
  content,
  children,
  ...rest
}: BoxSuccessProps) => {
  return (
    <div className="text-center py-4 px-2" {...rest}>
      <div className="inline-block">
        <div className="flex flex-col justify-center items-center bg-red-500 rounded-full w-14 h-14 text-center">
          <X className="w-5 h-5 text-white" />{" "}
        </div>
      </div>
      {title && (
        <h3 className="mt-6 mb-2 text-xl font-bold text-foreground">{title}</h3>
      )}
      <p className="mt-4 text-md text-foreground">{content}</p>
      {children}
    </div>
  );
};
