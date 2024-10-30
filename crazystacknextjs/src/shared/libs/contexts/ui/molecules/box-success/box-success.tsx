"use client";

import { CheckCircle } from "lucide-react";
import React from "react";
type BoxSuccessProps = {
  title?: string;
  content: string;
  children?: React.ReactNode;
};

export const BoxSuccess = ({
  title,
  content,
  children,
  ...rest
}: BoxSuccessProps) => {
  return (
    <div className="text-center py-4 px-2" {...rest}>
      <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
      {title && (
        <h3 className="mt-6 mb-2 text-xl font-bold text-foreground">{title}</h3>
      )}
      <p className="mt-4 text-md text-foreground">{content}</p>
      {children}
    </div>
  );
};
