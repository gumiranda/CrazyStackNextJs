"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useWindowSize } from "@/shared/libs/hooks/useWindow";
interface AppointmentTimeListProps {
  timeList: string[];
  selectedTime: string | undefined;
  onSelect: (time: string) => void;
}

export const AppointmentTimeList = ({
  timeList,
  selectedTime,
  onSelect,
}: AppointmentTimeListProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const { width } = useWindowSize();
  const isDesktop = width >= 768;
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      setShowLeftArrow(scrollContainerRef.current.scrollLeft > 0);
      setShowRightArrow(
        scrollContainerRef.current.scrollLeft <
          scrollContainerRef.current.scrollWidth -
            scrollContainerRef.current.clientWidth,
      );
    }
  };
  useEffect(() => {
    checkScrollPosition();
    window.addEventListener("resize", checkScrollPosition);
    return () => window.removeEventListener("resize", checkScrollPosition);
  }, [timeList]);
  return (
    <div className="relative">
      {isDesktop && showLeftArrow && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full hidden md:flex"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      )}
      <div
        ref={scrollContainerRef}
        onScroll={checkScrollPosition}
        className="flex gap-3 overflow-x-auto border-b border-solid p-5 [&::-webkit-scrollbar]:hidden"
      >
        {timeList.length > 0 ? (
          <>
            {timeList.map((time, index) => (
              <Button
                key={index}
                variant={selectedTime === time ? "default" : "outline"}
                className="rounded-full"
                onClick={() => onSelect(time)}
              >
                {time}
              </Button>
            ))}
          </>
        ) : (
          <p className="text-xs">Não há horários disponíveis para este dia.</p>
        )}
      </div>
      {isDesktop && showRightArrow && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full hidden md:flex"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
