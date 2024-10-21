import { createRouter, createWebHistory } from 'vue-router';
import { jwtDecode } from "jwt-decode";
import LoginPage from '../../pages/components/login.vue';
import ProtectedRoute from '../../pages/components/Dashboard.vue';
import ServicesLogin from '../../pages/services/serLogin';


const routes = [
    {
        path: '/',
        component: LoginPage
    },
    { path: '/login', component: LoginPage },
    { 
      path: '/dashboard', 
      component: ProtectedRoute,
      meta: { requiresAuth: true }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Función para verificar si el token es válido localmente
const isTokenValid = (token: string) => {
  try {
    const decoded = jwtDecode<any>(token);
    const currentTime = Date.now() / 1000; // Tiempo actual en segundos
    return decoded.exp > currentTime; // El token es válido si no ha expirado
  } catch (error) {
    return false; // Si hay un error al decodificar, el token no es válido
  }
};

router.beforeEach(async (to, _from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const token = localStorage.getItem('token');
  
    if (requiresAuth) {
      if (token && isTokenValid(token)) {
        next();
      } else {
        await ServicesLogin.refreshToken()
            .then(response => {
                // Guardar el nuevo token
                localStorage.setItem('token', response.data.access_token);
                console.log('Token renovado automáticamente');
            })
            .catch(error => {
                console.error('Error al renovar el token', error);
                
                // Eliminar el token
                localStorage.removeItem('token');
                
                // Redirigir a login si es necesario
                window.location.href = '/login';
                
            });
      }
    } else {
      next();
    }
});

export default router;
