// auth.js (Utility functions for authentication)
export const getAuthToken = () => {
    return localStorage.getItem('auth_token'); // You can also use cookies
  };
  
  export const isAdmin = () => {
    const token = getAuthToken();
    if (!token) return false;
  
    try {
      const decoded = JSON.parse(atob(token.split('.')[1])); // Decoding JWT payload
      return decoded.role === 'admin'; // Check for admin role in the payload
    } catch (error) {
      return false;
    }
  };
  
  export const isAuthenticated = () => {
    const token = getAuthToken();
    return !!token;
  };
  