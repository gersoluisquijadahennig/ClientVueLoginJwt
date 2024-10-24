import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useLoginStore = defineStore('loginStore', () => {
  // Estado para almacenar los datos del usuario autenticado
  const user = ref<null|any>(null);

  // Computed para verificar si el usuario está autenticado
  const isAuthenticated = computed(() => user.value !== null);

  return {
    user,
    isAuthenticated,
    
  };
});