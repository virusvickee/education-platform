import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);

export const uploadPdf = (formData) => {
  return api.post('/pdf/upload', formData);
};

export const searchPdfs = (params) => api.get('/pdf/search', { params });
export const getPdfById = (id) => api.get(`/pdf/${id}`);
export const updatePdf = (id, data) => api.put(`/pdf/${id}`, data);
export const deletePdf = (id) => api.delete(`/pdf/${id}`);

export default api;
