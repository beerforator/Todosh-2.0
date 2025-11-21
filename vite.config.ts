import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Автоматически импортируем наш файл с переменными в каждый SCSS-файл
        additionalData: `@import "@/app/styles/_theme.scss";`
      }
    }
  }
})