import { jwtDecode } from 'jwt-decode';

// The token key used in localStorage
export const TOKEN_KEY = 'access_token';

export const getDecodedToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;
  
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

export const getUserRole = () => {
  const decodedToken = getDecodedToken();
  return decodedToken ? decodedToken.role : null;
};

export const getRedirectPath = () => {
  const role = getUserRole();
  
  if (role === 'Admin') {
    return '/super-admin';
  } else if (role === 'Organization Admin') {
    return '/admin';
  } else {
    return '/login'; // default redirect if no valid role found
  }
};