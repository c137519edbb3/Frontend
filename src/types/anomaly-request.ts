export interface AnomalyRequest {
  title: string;
  description: string;
  criticality: string;
  modelName: string;
  cameraIds: number[];
  startTime: string;
  endTime: string;
  daysOfWeek: string[];
}
