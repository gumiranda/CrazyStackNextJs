"use client";

import type { ReactNode } from "react";

interface ScrollWrapperProps {
  children: ReactNode;
  itemWidth: number; // Largura dos itens na lista
}

export const ScrollWrapper = ({ children, itemWidth }: ScrollWrapperProps) => {
  return (
    <div className="relative">
      <div className="flex gap-3 overflow-x-auto whitespace-nowrap scrollbar-hide [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
    </div>
  );
};
