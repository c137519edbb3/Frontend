// components/VideoUploader.tsx
// components/VideoUploader.tsx
import { IconUpload } from '@tabler/icons-react';
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
      <div className="flex items-center space-x-2 mt-16">
        <label
          htmlFor="video-upload"
          className="flex items-center space-x-2 bg-accent p-2 rounded cursor-pointer text-sm text-gray-500 file:font-semibold"
        >
          <IconUpload className="text-gray-500 h-6 w-6" />
          <span className="text-gray-700">Upload Video</span>
        </label>
        <input
          id="video-upload"
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          disabled={isProcessing}
          className="hidden" // Hides the input
        />
      </div>
      {videoUrl && (
        <video id="video-preview" controls className="max-w-full h-auto">
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}
    </div>
  );
}