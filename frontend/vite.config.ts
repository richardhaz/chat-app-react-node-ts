import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  // base: '/your_sub_domain/',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/sass/styles.scss";'
      }
    }
  }
});
