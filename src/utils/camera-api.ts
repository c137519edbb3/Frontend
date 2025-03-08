import { Camera } from "@/types/camera";
import axios from "axios";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL_AWS;


export const fetchCameras = async (organizationId: number, token: string) => {
  try {
    const response = await axios.get(
      `${SERVER_URL}/api/organization/${organizationId}/cameras`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const cameras: Camera[] = response.data.cameras.map((camera: any) => ({
      cameraId: camera.cameraId.toString(),
      status: camera.status,
      ipAddress: camera.ipAddress,
      location: camera.location,
      cameraType: camera.cameraType,
      cameraDescription: camera.cameraDescription,
      NormalConditions: camera.NormalConditions
    }));

    return cameras;
  } catch (error) {
    console.error("Error fetching cameras:", error);
    throw error;
  }
};

export const updateCamera = async (
  organizationId: number,
  cameraId: number,
  cameraData: Partial<Camera>,
  token: string
) => {
  if (!organizationId || !cameraId || !token) {
    throw new Error('Missing required parameters');
  }

  try {
    const payload = {
      location: cameraData.location?.trim(),
      ipAddress: cameraData.ipAddress?.trim(),
      cameraType: cameraData.cameraType?.trim(),
      cameraDescription: cameraData.cameraDescription?.trim(),
      normalConditions: cameraData.NormalConditions
    };

    const response = await axios.put(
      `${SERVER_URL}/api/organization/${organizationId}/camera/${cameraId}`,
      payload,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.data || !response.data.camera) {
      throw new Error('Invalid response from server');
    }

    return {
      cameraId: response.data.camera.cameraId.toString(),
      status: response.data.camera.status || 'offline',
      ipAddress: response.data.camera.ipAddress,
      location: response.data.camera.location,
      cameraType: response.data.camera.cameraType,
      cameraDescription: response.data.camera.cameraDescription,
      NormalConditions: response.data.camera.NormalConditions
    };

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        data: error.response?.data
      });
      throw new Error(`Failed to update camera: ${error.response?.data?.message || error.message}`);
    }
    console.error('Update camera error:', error);
    throw new Error('Failed to update camera');
  }
};


export const deleteCamera = async (
    organizationId: number,
    cameraId: number,
    token: string
  ) => {
    try {
      const response = await axios.delete(
        `${SERVER_URL}/api/organization/${organizationId}/camera/${cameraId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
   
      if (response.status === 200) {
        console.log("Camera deleted successfully");
        return { success: true, message: "Camera deleted successfully" };
      } else {
        console.error("Failed to delete camera:", response);
        return { success: false, message: "Failed to delete camera" };
      }
    } catch (error) {
      console.error("Error deleting camera:", error);
      throw error;
    }
};



export const addCamera = async (
    organizationId: number,
    cameraData: Camera,
    token: string
  ) => {
    try {
        console.log('cameraData:',cameraData);
      const response = await axios.post(
        `${SERVER_URL}/api/organization/${organizationId}/camera`,
        {
            location: cameraData.location,
            ipAddress: cameraData.ipAddress,
            cameraType: cameraData.cameraType,
            cameraDescription: cameraData.cameraDescription,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('response:'      ,response);
      const newCamera: Camera = {
        cameraId: response.data.camera.cameraId.toString(),        
        ipAddress: response.data.camera.ipAddress,
        location: response.data.camera.location,
        cameraType: response.data.camera.cameraType,
        status: response.data.camera.status,
        cameraDescription: response.data.camera.cameraDescription,
      };
  
      return newCamera;
    } catch (error) {
      console.error("Error adding camera:", error);
      throw error;
    }
  };

  export const fetchOrganizationDetails = async (organizationId: number, token: string) => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/api/organization/${organizationId}/details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.data || !response.data.organization) {
        throw new Error('Invalid response from server');
      }
  
      const { organization } = response.data;
      
      return {
        id: organization.id,
        name: organization.name,
        maxCameras: organization.maxCameras,
        cameraCount: organization.cameraCount,
        usagePercentage: organization.usagePercentage
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Organization details error:', {
          status: error.response?.status,
          message: error.response?.data?.message || error.message,
          data: error.response?.data
        });
        throw new Error(`Failed to fetch organization details: ${error.response?.data?.message || error.message}`);
      }
      console.error("Error fetching organization details:", error);
      throw error;
    }
  };