import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../../shared'),
      '@api': path.resolve(__dirname, 'src/app/api'),
      '@ui': path.resolve(__dirname, 'src/app/ui'),
      '@store': path.resolve(__dirname, 'src/app/store'),
      '@features': path.resolve(__dirname, 'src/app/features'),
      '@utils': path.resolve(__dirname, 'src/app/utils'),
      '@hooks': path.resolve(__dirname, 'src/app/hooks'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
