import axios, { AxiosResponse, AxiosError } from 'axios';

const AxiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

AxiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  if (config.headers) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

AxiosClient.interceptors.response.use((response: AxiosResponse) => response, (error: AxiosError) => {
  const { response } = error;
  if (response?.status === 401) localStorage.removeItem('ACCESS_TOKEN');

  throw error;
});

export default AxiosClient;
