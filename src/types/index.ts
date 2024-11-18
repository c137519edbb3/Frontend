// types/index.ts
export interface ClientState {
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
  
  export interface FrameResponse {
    frame: string;
    label: string;
    confidence: number;
    frame_number: number;
    timestamp: number;
    hidden_state: number[][];
    cell_state: number[][];
  }