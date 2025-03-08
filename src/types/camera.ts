export interface NormalCondition {
  conditionId: number;
  description: string;
}

export interface Camera {
  cameraId: string;
  status: 'ONLINE' | 'OFFLINE';
  ipAddress: string;
  location: string;
  cameraType: string;
  cameraDescription?: string;
  NormalConditions?: NormalCondition[];
}