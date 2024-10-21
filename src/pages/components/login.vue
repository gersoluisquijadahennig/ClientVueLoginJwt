<template>
  <div class="wrapper">
    <div class="contenedor" align="center">
      <p class="title" align="center">Servicio de Salud del Bio-Bio</p>
      <table class="tabla_login" border="0">
        <tbody>
          <tr id="tr_principal">
            <td>
              <input id="runUser" type="text" class="txt_login" autocomplete="off" placeholder="Usuario"
                style="width:240px;" autofocus required @keydown.enter="acceder"  value="Gerso@gmail.com"/>
              <input id="passwordUser" type="password" class="txt_login" placeholder="Contraseña" style="width:240px;"
                required @keydown.enter="acceder" value="gquijada561" />
              <a href="#" id="olvida_clave">¿Olvidaste tu contraseña?</a>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="acceder" class="btn_ingresar">
        <span class="state">Acceder</span>
      </button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
    <div class="footer_ssbb">
      <label class="label_desa">
        Servicio de Salud Biobío | Departamento de Tecnologías de la Información y las Comunicaciones | Hecho en Chile
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { LoginInput } from '../interfaces/intLogin';
import ServicesLogin from '../services/serLogin';
import { useRouter } from 'vue-router';

const router = useRouter()

const errorMessage = ref('');

const acceder = async () => {
  const getInputValues = (): LoginInput | null => {
    const runInput = document.getElementById('runUser') as HTMLInputElement | null;
    const passwordInput = document.getElementById('passwordUser') as HTMLInputElement | null;

    if (runInput && passwordInput) {
      return {
        run: runInput.value,
        password: passwordInput.value,
      };
    }
    return null;
  };

  const inputValues = getInputValues();

  if (inputValues) {
    const { run, password } = inputValues;

    if (!run || !password) {
      errorMessage.value = 'Por favor, completa todos los campos.';
      return;
    }

    try {
      console.log(inputValues);
      const response = await ServicesLogin.getDataSession(run, password);
      // almacenar el token en el local storage
      console.log(response.access_token);
      localStorage.setItem('token', response.access_token);
      // Redirigir a la página de inicio con vue router
      router.push('/dashboard');
      
    } catch (err) {
      console.error('Error al obtener los datos de sesión', err);
      errorMessage.value = 'Credenciales incorrectas. Intenta nuevamente.'; // Mostrar mensaje de error
    }
  } else {
    console.error('No se encontraron los elementos input correspondientes.');
  }
};
</script>

<style scoped>
@import '../css/estilos.css';
</style>