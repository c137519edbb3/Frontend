import { AnomalyRequest } from "@/types/anomaly-request";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL_AWS;

export const getAnomalies = async (
  organizationId: number,
  accessToken: string
) => {
  try {
    const response = await fetch(
      `${SERVER_URL}/api/organization/${organizationId}/anomalies`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch anomalies");
    }

    return await response.json();
  } catch (error) {
    console.error("Anomalies fetch error:", error);
    throw error;
  }
};

export const getCameras = async (
  organizationId: number,
  accessToken: string
) => {
  try {
    const response = await fetch(
      `${SERVER_URL}/api/organization/${organizationId}/cameras`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch cameras");
    }

    const data = await response.json();
    return data.cameras;
  } catch (error) {
    console.error("Cameras fetch error:", error);
    throw error;
  }
};

export const deleteAnomaly = async (
  organizationId: number,
  anomalyId: number,
  accessToken: string
) => {
  try {
    const response = await fetch(
      `${SERVER_URL}/api/organization/${organizationId}/anomaly/${anomalyId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete anomaly");
    }

    return true;
  } catch (error) {
    console.error("Error deleting anomaly:", error);
    throw error;
  }
};

export const createAnomaly = async (
  organizationId: number,
  anomaly: AnomalyRequest,
  accessToken: string
) => {
  try {
    const response = await fetch(
      `${SERVER_URL}/api/organization/${organizationId}/anomaly`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          title: anomaly.title,
          description: anomaly.description,
          criticality: anomaly.criticality,
          modelName: anomaly.modelName,
          cameraIds: anomaly.cameraIds.map(Number),
          startTime: anomaly.startTime,
          endTime: anomaly.endTime,
          daysOfWeek: anomaly.daysOfWeek,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create anomaly");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating anomaly:", error);
    throw error;
  }
};

export const updateAnomaly = async (
  organizationId: number,
  anomalyId: number,
  anomaly: AnomalyRequest,
  accessToken: string
) => {
  try {
    console.log("Updating anomaly:", JSON.stringify(anomaly));
    const response = await fetch(
      `${SERVER_URL}/api/organization/${organizationId}/anomaly/${anomalyId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(anomaly),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update anomaly');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating anomaly:', error);
    throw error;
  }
};