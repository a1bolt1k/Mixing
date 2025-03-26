import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Mixing/', // Убедись, что этот путь правильный
  server: {
    host: true,
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
  }
});