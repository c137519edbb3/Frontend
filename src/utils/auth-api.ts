// src/utils/api.ts
import axios from 'axios';
 

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL_AWS;

// this function is used to perform Authentication
export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${SERVER_URL}/api/auth/login`, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};


