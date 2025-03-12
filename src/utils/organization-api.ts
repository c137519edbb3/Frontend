import axios from "axios";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL_AWS;

export const updateOrganization = async (
  organizationId: number,
  data: { name: string; maxCameras: number },
  accessToken: string
) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/admin/organization/${organizationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to update organization');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating organization:', error);
    throw error;
  }
};

export const addOrganizationAdmin = async (
  organizationId: number,
  adminData: {
    username: string;
    name: string;
    email: string;
    password: string;
  },
  accessToken: string
) => {
  try {
    const response = await fetch(
      `${SERVER_URL}/api/admin/organization/${organizationId}/admin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(adminData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to create admin (${response.status})`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating organization admin:", error);
    throw error;
  }
};