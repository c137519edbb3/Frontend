interface Anomaly {
    title: string;
    description: string;
    cameras: string[];
    criticality: "moderate" | "critical" | "catastrophic";
    scheduledTime: { start: string; end: string };
    weekdays: string[];
  }
  