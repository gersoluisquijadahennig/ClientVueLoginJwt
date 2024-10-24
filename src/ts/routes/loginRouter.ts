import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../../pages/components/login.vue';
import ProtectedRoute from '../../pages/components/Dashboard.vue';
import { useLoginStore } from '../../pages/store/loginStore';
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
      meta: { requiresAuth: true }, 
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, _from, next) => {
  const loginStore = useLoginStore();
  // Verifica si la ruta requiere autenticación
  if (to.meta.requiresAuth) {
    // Verifica si ya hay datos de autenticación
    if (!loginStore.isAuthenticated) {
      // Intenta verificar si la sesión es válida (consulta al backend usando checkAuth)
      try {
        //await ServicesLogin.checkAuth(); // Intenta autenticar con cookies
        loginStore.user = await ServicesLogin.me();
        if (loginStore.isAuthenticated) {
          next();  // Permite la navegación
        } else {
          next('/login');  // Redirige a la página de login si no está autenticado
        }
      } catch (error) {
        next('/login');  // Si hay algún error, redirige a login
      }
    } else {
      next();  // Si ya está autenticado, permite la navegación
    }
  } else {
    next();  // Si no requiere autenticación, permite la navegación
  }
});


export default router;
