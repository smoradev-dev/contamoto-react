import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración de Vite con el plugin de React (soporte para JSX y recarga rápida)
export default defineConfig({
  plugins: [react()],
});
