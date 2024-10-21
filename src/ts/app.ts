import { createApp } from 'vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import router from './routes/loginRouter'; // Importa el enrutador
import MainComponent from './MainComponent.vue'; // Aquí faltaban las comillas de cierre
import axiosConfig from './axiosConfig';

const app = createApp(MainComponent);
app.config.globalProperties.$http = axiosConfig;

app.use(router); // Usa el enrutador
app.mount('#app'); // Monta la aplicación en el elemento con el ID "app"
