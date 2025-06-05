"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    icon: any;
    name: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "300s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className="scroller  relative z-20 max-w-sm sm:max-w-md md:max-w-xl lg:max-w-5xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
    >
      <ul
        ref={scrollerRef}
        className={`flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap animate-scroll `}>
        {items.map((item, idx) => (
          <li
            key={idx}
            className="w-[200px] max-w-full shadow-md relative rounded-xl border border-black border-opacity-5 px-4 py-3 flex-shrink-0 backdrop-blur-3xl bg-blue-700 bg-opacity-70  transition-colors duration-200"
          >
            <div className="flex flex-row items-center gap-2">
              <div className="p-2 rounded-full bg-white bg-opacity-30">
                <item.icon className="w-6 h-6 text-white/80  stroke-white/80" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-white">{item.name}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
