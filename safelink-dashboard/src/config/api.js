// src/config/api.js
// Centralized API configuration for production deployment

const getApiBaseUrl = () => {
  // Always use environment variable if provided
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  // In production, use default Render URL
  if (import.meta.env.PROD) {
    return "https://safelink-api.onrender.com";
  }
  // In development, use localhost
  return "http://localhost:4000";
};

export const API_BASE = getApiBaseUrl();
export const API_BASE_URL = `${API_BASE}/api`;

// Log API base URL in development
if (import.meta.env.DEV) {
  console.log(`[API Config] Using API base: ${API_BASE}`);
} else {
  console.log(`[API Config] Production API base: ${API_BASE}`);
}

