import axiosConfig from '../../ts/axiosConfig';
import { SessionData , Me} from '../interfaces/intLogin';

export default class ServicesLogin {
  static async getDataSession(email: string, password: string): Promise<any> {
    try {
      const response = await axiosConfig.post<SessionData>('/login', {
        email, password
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener los datos de sesión:', error);
      throw error;
    }
  }

  static async me()
   : Promise<Me>  {
    try {
      const response = await axiosConfig.get('/me');
      return response.data;
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
      throw error;
    }
  }

  static async refreshToken(): Promise<any> {
    try {
      const response = await axiosConfig.post('/refresh');
      return response.data;
    } catch (error) {
      console.error('Error al renovar el token:', error);
      throw error;
    }
  }

  static async logout(): Promise<any> {
    try {
      const response = await axiosConfig.post('/logout');
      
      // Eliminar el token del almacenamiento local
      localStorage.removeItem('token');
      
      // Eliminar la cookie del token
      document.cookie = `access_token=;`;
      
      return response.data;
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }

}
