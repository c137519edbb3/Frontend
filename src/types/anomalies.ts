interface Anomaly {
    anomalyId: number;
    title: string;
    description: string;
    cameras: string[];
    criticality: string;
    startTime: string;
    endTime: string;
    modelName: string;
    status: string;
    daysOfWeek: string[];
}