// contexts/AppContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

export interface ClientState {
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

interface AppContextType {
  clientStates: ClientState[];
  setClientStates: (states: ClientState[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [clientStates, setClientStates] = useState<ClientState[]>([]);

  return (
    <AppContext.Provider value={{ clientStates, setClientStates }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}