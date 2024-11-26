// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.PORT) || 4173,  // Default to 4173, but allow for deployment overrides
  },
});
