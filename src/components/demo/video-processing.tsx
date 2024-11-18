import { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface VideoProcessorProps {
    videoFile: File;
    clientStates: ClientState[];
  }
  
  interface ClientState {
    clientId: string;
    hiddenState: number[][] | null;
    cellState: number[][] | null;
    frameCount: number;
    totalTime: number;
    frameProcessingTimes: number[];
    labelCounts: {
      catastrophe: number;
      critical: number;
      moderate: number;
    };
  }
  
  interface ProcessingResult {
    clientId: string;
    frameCount: number;
    totalTime: number;
    avgProcessingTime: number;
    labelCounts: {
      catastrophe: number;
      critical: number;
      moderate: number;
    };
  }
  
  interface ApiResponse {
    frame: string;
    label: 'catastrophe' | 'critical' | 'moderate';
    confidence: number;
    frame_number: number;
    timestamp: number;
    hidden_state: number[][];
    cell_state: number[][];
  }


  const VideoProcessor: React.FC<VideoProcessorProps> = ({ videoFile, clientStates }) => {
    const [processingResults, setProcessingResults] = useState<ProcessingResult[]>([]);
    const [currentFrame, setCurrentFrame] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
  
    useEffect(() => {
      if (videoFile && clientStates.length > 0) {
        processVideoForClients();
      }
    }, [videoFile, clientStates]);
  
    const captureFrame = (video: HTMLVideoElement, canvas: HTMLCanvasElement): string => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return '';
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/jpeg');
    };
  
    const processVideoForClients = async () => {
      if (!videoRef.current || !canvasRef.current) return;
  
      setIsProcessing(true);
      const video = videoRef.current;
      video.src = URL.createObjectURL(videoFile);
  
      await new Promise<void>((resolve) => {
        video.onloadedmetadata = () => {
          video.currentTime = 0;
          resolve();
        };
      });
  
      const results: ProcessingResult[] = clientStates.map((client: ClientState) => ({
        clientId: client.clientId,
        frameCount: 0,
        totalTime: 0,
        avgProcessingTime: 0,
        labelCounts: {
          catastrophe: 0,
          critical: 0,
          moderate: 0
        }
      }));
  
      video.oncanplay = async () => {
        while (video.currentTime < video.duration) {
          const timestamp = Math.floor(video.currentTime);
          const frameDataUrl = captureFrame(video, canvasRef.current!);
          setCurrentFrame(frameDataUrl);
  
          await Promise.all(clientStates.map(async (client: ClientState, index: number) => {
            const startTime = performance.now();
            const response = await fetch("https://stateless-model-214728805641.us-central1.run.app/frame", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                client_id: client.clientId,
                frame: frameDataUrl,
                timestamp,
                hidden_state: client.hiddenState,
                cell_state: client.cellState,
              })
            });
  
            const data: ApiResponse = await response.json();
            const processingTime = performance.now() - startTime;
  
            // Update results
            results[index].frameCount++;
            results[index].totalTime += processingTime;
            results[index].avgProcessingTime = results[index].totalTime / results[index].frameCount;
            results[index].labelCounts[data.label]++;
            console.log(results);
            setProcessingResults([...results]);
          }));
  
          video.currentTime += 1;
        }
        setIsProcessing(false);
      };
    };
  
    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Frame</CardTitle>
            </CardHeader>
            <CardContent>
              {currentFrame && (
                <img src={currentFrame} alt="Current frame" className="w-full rounded" />
              )}
              <video ref={videoRef} className="hidden" />
              <canvas ref={canvasRef} className="hidden" />
            </CardContent>
          </Card>
  
          <Card>
            <CardHeader>
              <CardTitle>Processing Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client ID</TableHead>
                    <TableHead>Frames</TableHead>
                    <TableHead>Avg Time (ms)</TableHead>
                    <TableHead>Labels</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {processingResults.map((result) => (
                    <TableRow key={result.clientId}>
                      <TableCell>{result.clientId}</TableCell>
                      <TableCell>{result.frameCount}</TableCell>
                      <TableCell>{result.avgProcessingTime.toFixed(2)}</TableCell>
                      <TableCell>
                        C: {result.labelCounts.catastrophe} |
                        Cr: {result.labelCounts.critical} |
                        M: {result.labelCounts.moderate}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };
  
  export default VideoProcessor;