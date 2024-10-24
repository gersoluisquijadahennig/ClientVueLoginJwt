import axiosConfig from '../../ts/axiosConfig';
import { SessionData , Me} from '../interfaces/intLogin';

export default class ServicesLogin {
  static async login(email: string, password: string): Promise<any> {
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

  static async checkAuth(): Promise<any> {
    try {
      const response = await axiosConfig.get('/verify'); // Ruta para obtener datos del usuario autenticado
      return response.data;  // Si hay respuesta, el usuario está autenticado
    } catch (error) {
      throw error;
    }
  };

  static async logout(): Promise<any> {
    try {
      const response = await axiosConfig.post('/logout');
      return response.data;
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }

}
