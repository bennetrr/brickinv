import * as path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  },
  resolve: {
    preserveSymlinks: true,
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      '@wemogy/reactbase': path.resolve(__dirname, 'node_modules/@wemogy/reactbase'),
      mobx: path.resolve(__dirname, 'node_modules/mobx'),
      'mobx-state-tree': path.resolve(__dirname, 'node_modules/mobx-state-tree'),
      'styled-components': path.resolve(__dirname, 'node_modules/styled-components'),
    }
  }
});
