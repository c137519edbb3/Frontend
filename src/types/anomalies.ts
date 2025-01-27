export interface Anomaly {
    daysOfWeek: string[];
    anomalyId: number;
    title: string;
    description: string;
    criticality: string;
    startTime: string;
    endTime: string;
    modelName: string;
    status: string;
    organizationId: number;
    createdAt: string;
    updatedAt: string;
    Cameras: {
      cameraId: number;
      location: string;
      ipAddress: string;
      cameraType: string;
      AnomalyCamera: {
        id: number;
        createdAt: string;
        updatedAt: string;
        AnomalyAnomalyId: number;
        CameraCameraId: number;
      };
    }[];
  }