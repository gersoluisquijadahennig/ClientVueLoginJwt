import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import ServicesLogin from '../pages/services/serLogin';

const apiClient = axios.create({
  baseURL:'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(async config => {
  const token = localStorage.getItem('token');
 
      config.headers.Authorization = `Bearer ${token}`;

  return config;
}, error => {
  return Promise.reject(error);
});

// Función para calcular si el token está próximo a expirar
const isTokenExpiringSoon = (token: string) => {  
  const decoded = jwtDecode<any>(token);
  const currentTime = Date.now() / 1000;  // Tiempo actual en segundos
  const expirationTime = decoded.exp;     // Tiempo de expiración en el token

  console.log('Tiempo actual:', currentTime);
  console.log('Tiempo de expiración:', expirationTime);
  console.log('Tiempo restante para expirar:', expirationTime - currentTime,'segundos');  // Tiempo restante en segundos

  // Si faltan menos de 1 minuto para expirar
  return (expirationTime - currentTime) < 60; 
};

const refreshToken = async () => {
  const token = localStorage.getItem('token');
  
  // Si hay un token y está por expirar, intentar renovarlo
  if (token && isTokenExpiringSoon(token)) {
    try {
      const response = await ServicesLogin.refreshToken();
      
      // Guardar el nuevo token
      localStorage.setItem('token', response.data.access_token);
      console.log('Token renovado automáticamente');
    } catch (error : any) {
      console.error('Error al renovar el token', error);
      
      // Eliminar el token
      localStorage.removeItem('token');
      
      // Redirigir a login si es necesario
      window.location.href = '/login';
    }
  }
};
// Configurar un intervalo que ejecute cada minuto (60,000 ms)
setInterval(() => {
  console.log('Verificando token...');
  refreshToken();
}, 10 * 1000); // 10 segundos

// Opcional: verificar el token inmediatamente al cargar la página
refreshToken();

export default apiClient;