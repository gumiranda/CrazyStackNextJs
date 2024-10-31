"use client";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useRef, useState, useEffect, ReactNode } from "react";

interface ScrollWrapperProps {
  children: ReactNode;
  itemWidth: number; // Largura dos itens na lista
}

export const ScrollWrapper = ({ children, itemWidth }: ScrollWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: itemWidth,
        behavior: "smooth",
      });
    }
  };
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -itemWidth,
        behavior: "smooth",
      });
    }
  };
  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  };
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
  return (
    <div className="relative">
      {showLeftArrow && (
        <DivArrow onClick={scrollLeft} className="left-0">
          <ArrowLeft size={24} />
        </DivArrow>
      )}
      <div
        ref={containerRef}
        className="flex gap-3 overflow-x-auto whitespace-nowrap scrollbar-hide [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      {showRightArrow && (
        <DivArrow onClick={scrollRight} className={"translate-x-1/2 right-0"}>
          <ArrowRight size={24} />
        </DivArrow>
      )}
    </div>
  );
};

const DivArrow = ({
  onClick,
  children,
  className,
}: {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "hidden md:block absolute top-1/2 transform -translate-x-1/2  -translate-y-1/2 text-black bg-gray-300 hover:bg-gray-400 rounded-full p-2 cursor-pointer z-50",
      className,
    )}
    onClick={onClick}
  >
    {children}
  </div>
);
