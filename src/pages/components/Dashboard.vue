<template>
    Ruta protegida
    <button type="button" @click="buscarDatos">buscar datos del usuario</button>
    <h2>Nombre: {{ name }}</h2>
    <h2>Email: {{ email }}</h2>

    <!-- logout -->
     <button type="button" @click="logout">Logout</button>
</template>
<script lang="ts" setup>
import { ref} from "vue";
import ServicesLogin from "../services/serLogin";
import { useRouter } from 'vue-router';

const router = useRouter();
const name = ref('');
const email = ref('');

const buscarDatos = () => {
    ServicesLogin.me().then((response) => {
        console.log(response);
        name.value = response.name
        email.value = response.email
    });
};


const logout = async() => {
   await ServicesLogin.logout().then(() => {
        document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push('/login');
    });
};

</script>