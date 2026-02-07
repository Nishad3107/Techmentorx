import axios from 'axios';

// API Base URLs
const NGO_SERVICE_URL = process.env.NEXT_PUBLIC_NGO_SERVICE_URL || 'http://localhost:3001';
const BLOCKCHAIN_SERVICE_URL = process.env.NEXT_PUBLIC_BLOCKCHAIN_SERVICE_URL || 'http://localhost:3003';
const PAYMENT_SERVICE_URL = process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL || 'http://localhost:3004';

// Create axios instances for each service
export const ngoApi = axios.create({
  baseURL: `${NGO_SERVICE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const blockchainApi = axios.create({
  baseURL: `${BLOCKCHAIN_SERVICE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const paymentApi = axios.create({
  baseURL: `${PAYMENT_SERVICE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
const addAuthToken = (config: any) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

ngoApi.interceptors.request.use(addAuthToken);
blockchainApi.interceptors.request.use(addAuthToken);
paymentApi.interceptors.request.use(addAuthToken);

// Response interceptor for error handling
const handleError = (error: any) => {
  if (error.response?.status === 401) {
    // Redirect to login if unauthorized
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
  }
  return Promise.reject(error);
};

ngoApi.interceptors.response.use((response) => response, handleError);
blockchainApi.interceptors.response.use((response) => response, handleError);
paymentApi.interceptors.response.use((response) => response, handleError);

export default { ngoApi, blockchainApi, paymentApi };
