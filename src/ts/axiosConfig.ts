import axios from 'axios';

const apiClient = axios.create({
  baseURL:'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,// garantiza que cada peticion se envia con el token cookie
});


export default apiClient;