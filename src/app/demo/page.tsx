'use client';

import { useState } from 'react';
import VideoUploader from '@/components/demo/VideoUploader';
import ClientStreaming from '@/components/demo/ClientStreaming';
import ClientSummary from '@/components/demo/ClientSummary';
import { ClientState } from '@/types';

export default function Home() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [clientStates, setClientStates] = useState<Record<number, ClientState>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Simultaneous Client Streaming</h1>
      
      <div className="space-y-6">
      <VideoUploader 
        onVideoSelect={(url) => setVideoUrl(url)} 
        isProcessing={isProcessing}
        videoUrl={videoUrl}  // Add this line
      />
        
        <ClientStreaming
          videoUrl={videoUrl}
          onClientStatesUpdate={setClientStates}
          onProcessingStateChange={setIsProcessing}
        />
        
        <ClientSummary clientStates={clientStates} />
      </div>
    </main>
  );
}