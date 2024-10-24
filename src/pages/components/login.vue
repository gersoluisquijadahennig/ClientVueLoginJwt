<template>
  <div class="wrapper">
    <div class="contenedor" align="center">
      <p class="title" align="center">Servicio de Salud del Bio-Bio</p>
      <table class="tabla_login" border="0">
        <tbody>
          <tr id="tr_principal">
            <td>
              <input v-model="form.run" type="text" class="txt_login" autocomplete="off" placeholder="Usuario"
                style="width:240px;" autofocus required @keydown.enter="acceder" />
              <input v-model="form.clave" type="password" class="txt_login" placeholder="Contraseña" style="width:240px;"
                required @keydown.enter="acceder" />
              <a href="#" id="olvida_clave">¿Olvidaste tu contraseña?</a>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="acceder" class="btn_ingresar">
        <span class="state">Acceder</span>
      </button>
    </div>
    <div class="footer_ssbb">
      <label class="label_desa">
        Servicio de Salud Biobío | Departamento de Tecnologías de la Información y las Comunicaciones | Hecho en Chile
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive} from 'vue';
import ServicesLogin from '../services/serLogin';
import { useRouter } from 'vue-router';
import { useLoginStore } from '../store/loginStore';

const loginStore = useLoginStore();
const router = useRouter()

interface LoginInput {
  run: string;
  clave: string;
}

// Update the form variable to be of type LoginInput
const form = reactive<LoginInput>({
  run: 'Gerso@gmail.com',
  clave: 'gquijada561',
})

const acceder = async () => {

  if(!form.run && !form.run){
    return;
  }
  try{
    loginStore.user = await ServicesLogin.login(form.run, form.clave)
    router.push('/dashboard')
  }catch(error){
    loginStore.user = null;
    return;
  }
  


}
    

</script>

<style scoped>
@import '../css/estilos.css';
</style>