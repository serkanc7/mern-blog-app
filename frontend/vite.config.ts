import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import envCompatible from 'vite-plugin-env-compatible';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
    },
    plugins: [react(), envCompatible()],
    server: {
      port: 3000,
      host: true
    },
    preview: {
      port: 3000,
      host: true
    }
  }
});