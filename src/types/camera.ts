export interface Camera {
    cameraId: string;
    status: 'ONLINE' | 'OFFLINE';
    ipAddress: string;
    location: string;
    cameraType: string;
  }  