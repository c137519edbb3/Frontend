export interface Camera {
    id: string;
    name: string;
    state: 'connected' | 'running' | 'disconnected';
    location: string;
    model: string;
    imageUrl: string;
  }  