// src/utils/api.ts
import axios from 'axios';
 

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL_AWS;

export const loginUser = async (username: string, password: string) => {
  console.log('SERVER_URL:', SERVER_URL);
  try {
    const response = await axios.post(`${SERVER_URL}/api/auth/login`, {
      username,
      password
    });
    console.log('login response:',response);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};


