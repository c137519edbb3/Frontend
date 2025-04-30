"use client";
import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export const ContainerScroll = ({ children }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.9, 0.7] : [1, 1.05];  // Reversed
  };

  // Reversed the start and end values
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  return (
    <div
      className="flex items-start justify-center relative p-2 md:pt-0"
      ref={containerRef}
      style={{ marginTop: 0 }}
    >
      <div
        className="w-1/2 relative"
        style={{
          perspective: "800px",
        }}
      >
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Card = ({ rotate, scale, translate, children }) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        y: translate,
      }}
    >
      <div>{children}</div>
    </motion.div>
  );
};