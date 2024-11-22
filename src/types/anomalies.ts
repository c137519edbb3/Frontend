interface Anomaly {
    id: number;
    title: string;
    description: string;
    cameras: string[];
    criticality: "Moderate" | "Critical" | "Catastrophic";
    scheduledTime: { start: string; end: string };
    weekdays: string[];
  }
  