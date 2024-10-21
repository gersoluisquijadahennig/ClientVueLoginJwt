import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base:'/',
  build: {
    outDir: 'dist',  // Salida de la carpeta de producción
    assetsDir: 'assets', // Esto creará una carpeta "assets" dentro de "dist"
    sourcemap: false,  // Desactiva los sourcemaps para producción
    // Puedes agregar más configuraciones según sea necesario
  },
})
