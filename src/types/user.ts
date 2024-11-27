export interface User {
    id: string;
    name: string;
    state: 'connected' | 'running' | 'disconnected';
    ipAddress: string;
    location: string;
    model: string;
  }  