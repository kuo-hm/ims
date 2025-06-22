import axios from 'axios';

const url = process.env.API_URL || 'http://localhost:8080';
const api = axios.create({
  baseURL: url + '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export { api };
