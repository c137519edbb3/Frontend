// components/ClientStreaming.tsx
import { useState, useEffect } from 'react';
import { ClientState, FrameResponse } from '@/types';

interface ClientStreamingProps {
  videoUrl: string | null;
  onClientStatesUpdate: (states: Record<number, ClientState>) => void;
  onProcessingStateChange: (processing: boolean) => void;
}

export default function ClientStreaming({ 
  videoUrl, 
  onClientStatesUpdate,
  onProcessingStateChange 
}: ClientStreamingProps) {
  const [numClients, setNumClients] = useState(1);
  const [log, setLog] = useState<string[]>([]);

  const startStreaming = async () => {
    if (!videoUrl) return;
    
    onProcessingStateChange(true);
    const clientStates: Record<number, ClientState> = {};
    
    // Initialize client states
    for (let i = 1; i <= numClients; i++) {
      clientStates[i] = {
        hiddenState: null,
        cellState: null,
        frameCount: 0,
        totalTime: 0,
        frameProcessingTimes: [],
        labelCounts: { catastrophe: 0, critical: 0, moderate: 0 }
      };
    }
    
    onClientStatesUpdate(clientStates);
    
    // Start streaming for each client
    for (let clientId = 1; clientId <= numClients; clientId++) {
      startClientStream(clientId, videoUrl, clientStates);
    }
  };

  const startClientStream = async (
    clientId: number, 
    videoUrl: string,
    clientStates: Record<number, ClientState>
  ) => {
    const video = document.createElement('video');
    video.src = videoUrl;
    await video.play();

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let lastCapturedSecond = -1;

    const captureFrame = async () => {
      if (video.ended) {
        onProcessingStateChange(false);
        return;
      }

      const currentSecond = Math.floor(video.currentTime);
      if (currentSecond !== lastCapturedSecond && ctx) {
        lastCapturedSecond = currentSecond;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const frameDataUrl = canvas.toDataURL('image/jpeg');
        await sendFrameToBackend(clientId, frameDataUrl, currentSecond, clientStates);
      }

      requestAnimationFrame(captureFrame);
    };

    requestAnimationFrame(captureFrame);
    video.currentTime = 0;
  };

  const sendFrameToBackend = async (
    clientId: number,
    frame: string,
    timestamp: number,
    clientStates: Record<number, ClientState>
  ) => {
    const startTime = performance.now();
    
    try {
      const response = await fetch('https://stateless-model-214728805641.us-central1.run.app/frame', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: clientId,
          frame,
          timestamp,
          hidden_state: clientStates[clientId].hiddenState,
          cell_state: clientStates[clientId].cellState,
        }),
      });

      const data: FrameResponse = await response.json();
      const endTime = performance.now();
      const processingTime = endTime - startTime;

      // Update client state
      const state = clientStates[clientId];
      state.totalTime += processingTime;
      state.frameProcessingTimes.push(processingTime);
      state.frameCount++;
      state.labelCounts[data.label as keyof typeof state.labelCounts]++;
      state.hiddenState = data.hidden_state;
      state.cellState = data.cell_state;

      // Update log
      const logEntry = `Client: ${clientId}, Frame: ${state.frameCount}, Timestamp: ${data.timestamp}s, Label: ${data.label} (${data.confidence.toFixed(2)}), Processing Time: ${processingTime.toFixed(2)} ms`;
      setLog(prev => [...prev, logEntry]);

      onClientStatesUpdate({ ...clientStates });

    } catch (error) {
      console.error('Error processing frame:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <input
          type="number"
          min={1}
          max={50}
          value={numClients}
          onChange={(e) => setNumClients(parseInt(e.target.value))}
          className="border rounded px-3 py-2 w-40"
          placeholder="Number of Clients"
        />
        <button
          onClick={startStreaming}
          disabled={!videoUrl}
          className="bg-primary text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Start Streaming
        </button>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {log.map((entry, index) => (
          <div key={index} className="p-2 bg-gray-50 rounded">
            {entry}
          </div>
        ))}
      </div>
    </div>
  );
}
