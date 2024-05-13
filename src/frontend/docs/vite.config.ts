import { defineConfig } from 'vite';
import baseConfig from '../vite.config';

// https://vitejs.dev/config/
export default defineConfig({
  ...baseConfig,
  publicDir: '../public',
  server: {
    port: 5050,
    strictPort: true
  }
});
