import axios from 'axios';

export const BASE_URL = 'http://192.168.0.181:3001';

export const api = axios.create({
  baseURL: BASE_URL,
});
