import axios from 'axios';
import { API_CONFIG, PAGINATION, NEWS } from '../utils/constants';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: API_CONFIG.TIMEOUT
});


api.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export const newsAPI = {
  getAll: (skip = 0, take = PAGINATION.DEFAULT_PAGE_SIZE) => 
    api.get(`/News?skip=${skip}&take=${take}`),
  getById: (id) => api.get(`/News/${id}`),
  getLatest: (count = NEWS.LATEST_COUNT) => 
    api.get(`/News/latest?count=${count}`),
  create: (news) => api.post('/News', news),
  update: (id, news) => api.put(`/News/${id}`, news),
  delete: (id) => api.delete(`/News/${id}`)
};

export const authAPI = {
  login: (credentials) => api.post('/Auth/login', credentials),
  logout: () => api.post('/Auth/logout'),
  check: () => api.get('/Auth/check'),
  register: (userData) => api.post('/Auth/register', userData)
};

export default api;

