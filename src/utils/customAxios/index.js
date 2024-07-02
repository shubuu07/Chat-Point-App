import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../env';

const customAxios = axios.create({
  baseURL: config.API_URL,
});

customAxios.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem('@token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor
customAxios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.log('Unauthorized error occurred');
    }
    return Promise.reject(error);
  }
);

export default customAxios;
