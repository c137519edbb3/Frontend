// components/VideoUploader.tsx
// components/VideoUploader.tsx
import { ChangeEvent } from 'react';

interface VideoUploaderProps {
  onVideoSelect: (url: string) => void;
  isProcessing: boolean;
  videoUrl: string | null;  // Add this line
}

export default function VideoUploader({ 
  onVideoSelect, 
  isProcessing, 
  videoUrl  // Add this line
}: VideoUploaderProps) {
  const handleVideoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onVideoSelect(url);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="video/*"
        onChange={handleVideoUpload}
        disabled={isProcessing}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100"
      />
      {videoUrl && (
        <video id="video-preview" controls className="max-w-full h-auto">
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}
    </div>
  );
}