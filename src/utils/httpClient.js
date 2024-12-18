import axios from 'axios';
import { environment } from './environment';

const authClient = axios.create({
  baseURL: '' + environment.userEndpoint + '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

authClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const masterClient = axios.create({
  baseURL: environment.mastersEndPoint + '/api/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('adminToken')}`
  }
});

const projectClient = axios.create({
  baseURL: environment.servicesEndPoint + '/api/project/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('adminToken')}`
  }
});

const expoClient = axios.create({
  baseURL: 'https://mmworkspace.com/expo/api/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('adminToken')}`
  }
});

export { authClient, masterClient, projectClient, expoClient };
