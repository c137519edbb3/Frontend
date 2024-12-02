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
    try {
        console.log('cameraData:',cameraData);
      const response = await axios.put(
        `${SERVER_URL}/api/organization/${organizationId}/camera/${cameraId}`,
        {
            location: cameraData.location,
            ipAddress: cameraData.ipAddress,
            cameraType: cameraData.cameraType,
        },{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('response:'      ,response);
      const updatedCamera: Camera = {
        cameraId: response.data.camera.cameraId.toString(),
        status: response.data.camera.status,
        ipAddress: response.data.camera.ipAddress,
        location: response.data.camera.location,
        cameraType: response.data.camera.cameraType,
      };
  
      return updatedCamera;
    } catch (error) {
      console.error("Error updating camera:", error);
      throw error;
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
      };
  
      return newCamera;
    } catch (error) {
      console.error("Error adding camera:", error);
      throw error;
    }
  };