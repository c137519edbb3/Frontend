import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface VideoFrameDisplayProps {
  videoFile: File | null;
}

interface ExtractedFrame {
  dataUrl: string;
  frameNumber: number;
}

const VideoFrameDisplay: React.FC<VideoFrameDisplayProps> = ({ videoFile }) => {
  const [extractedFrames, setExtractedFrames] = useState<ExtractedFrame[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const extractFrames = async () => {
    if (!videoFile || !videoRef.current || !canvasRef.current) return;
  
    setIsExtracting(true);
    const frames: ExtractedFrame[] = [];
    
    // Create video element
    const video = videoRef.current;
    video.src = URL.createObjectURL(videoFile);
    
    // Wait for metadata to load
    await new Promise<void>((resolve) => {
      video.onloadedmetadata = () => {
        video.currentTime = 0;
        resolve();
      };
    });
  
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
  
    return new Promise<ExtractedFrame[]>((resolve) => {
      let frameNumber = 0;
  
      const captureFrame = () => {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
  
        // Draw current video frame on canvas
        context?.drawImage(video, 0, 0, canvas.width, canvas.height);
  
        // Convert canvas to data URL
        const dataUrl = canvas.toDataURL('image/png');
        frames.push({ dataUrl, frameNumber });
        frameNumber++;
  
        // Move to next second
        video.currentTime += 1;
  
        // Check if we've reached the end of the video
        if (video.currentTime < video.duration) {
          requestAnimationFrame(captureFrame);
        } else {
          setExtractedFrames(frames);
          setIsExtracting(false);
          resolve(frames);
        }
      };
  
      video.oncanplay = () => {
        captureFrame();
      };
    });
  };

  useEffect(() => {
    if (videoFile) {
      extractFrames();
    }
  }, [videoFile]);

  return (
    <div className="video-frame-display pr-16">
      {/* Hidden video and canvas elements for frame extraction */}
      <video ref={videoRef} style={{ display: 'none' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
  
      {isExtracting && (
        <div className="extraction-progress">
          Extracting frames... Please wait.
        </div>
      )}
  
      {extractedFrames.length > 0 && (
        <div className="frames-container w-screen flex overflow-x-auto">
        {extractedFrames.map((frame) => (
          <div 
            key={frame.frameNumber} 
            className="frame-item flex-shrink-0 relative border"
          >
            <Image
              src={frame.dataUrl}
              alt={`Frame ${frame.frameNumber}`}
              width={300}
              height={200}
              className="object-contain"
            />
            <div className="absolute bottom-0 left-0 bg-black text-white px-1 text-xs">
              Frame: {frame.frameNumber}
            </div>
          </div>
        ))}
      </div>
      
      )}
    </div> 
  );
};

export default VideoFrameDisplay;