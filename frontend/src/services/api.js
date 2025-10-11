import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Reports API
export const reportAPI = {
  create: (data) => api.post('/reports', data),
  getAll: () => api.get('/reports'),
  getMyReports: () => api.get('/reports/my-reports'),
  getById: (id) => api.get(`/reports/${id}`),
  updateStatus: (id, data) => api.put(`/reports/${id}/status`, data),
  addComment: (id, data) => api.post(`/reports/${id}/comments`, data),
  delete: (id) => api.delete(`/reports/${id}`),
};

// Announcements API
export const announcementAPI = {
  create: (data) => api.post('/announcements', data),
  getAll: () => api.get('/announcements/all'),
  getPublished: () => api.get('/announcements'),
  getById: (id) => api.get(`/announcements/${id}`),
  update: (id, data) => api.put(`/announcements/${id}`, data),
  togglePublish: (id) => api.put(`/announcements/${id}/publish`),
  delete: (id) => api.delete(`/announcements/${id}`),
};

export default api;
