import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  },
  register: async (userData: any) => {
    const { data } = await api.post('/auth/register', userData);
    return data;
  },
};

export const users = {
  getAll: async () => {
    const { data } = await api.get('/users');
    return data;
  },
  getById: async (id: string) => {
    const { data } = await api.get(`/users/${id}`);
    return data;
  },
  create: async (userData: any) => {
    const { data } = await api.post('/users', userData);
    return data;
  },
  update: async (id: string, userData: any) => {
    const { data } = await api.put(`/users/${id}`, userData);
    return data;
  },
  delete: async (id: string) => {
    await api.delete(`/users/${id}`);
  },
};

export const companies = {
  getAll: async () => {
    const { data } = await api.get('/companies');
    return data;
  },
  getById: async (id: string) => {
    const { data } = await api.get(`/companies/${id}`);
    return data;
  },
  create: async (companyData: any) => {
    const { data } = await api.post('/companies', companyData);
    return data;
  },
  update: async (id: string, companyData: any) => {
    const { data } = await api.put(`/companies/${id}`, companyData);
    return data;
  },
  delete: async (id: string) => {
    await api.delete(`/companies/${id}`);
  },
};

export const licenses = {
  getAll: async () => {
    const { data } = await api.get('/licenses');
    return data;
  },
  create: async (licenseData: any) => {
    const { data } = await api.post('/licenses', licenseData);
    return data;
  },
};

export const dashboard = {
  getFinancialMetrics: async () => {
    const { data } = await api.get('/dashboard/financial-metrics');
    return data;
  },
  getRevenueHistory: async () => {
    const { data } = await api.get('/dashboard/revenue-history');
    return data;
  },
};

export default api;