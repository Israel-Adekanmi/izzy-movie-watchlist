// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Ensure that the server is listening on all interfaces
    port: process.env.PORT || 4173,  // Use the provided PORT or default to 4173
  },
});
