"use client";

import React, { useEffect, useRef } from "react";

interface VideoPlayerProps {
  videoUrl: string; // Accepts the live stream URL as a prop
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null); // Create a ref for the video element

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videoUrl; // Set the video URL dynamically
      videoRef.current.play().catch((err) => {
        console.error("Error attempting to play video:", err);
      });
    }
  }, [videoUrl]); // Re-run the effect if the video URL changes

  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
      {/* Video element to stream live video */}
      <video
        ref={videoRef} // Attach the ref to the video element
        className="w-full h-full rounded-xl"
        controls       // Enable video controls (play, pause, etc.)
        muted          // Optionally start the video muted
        autoPlay       // Autoplay the video when loaded
        playsInline    // For mobile support
      />
    </div>
  );
};

export default VideoPlayer;
