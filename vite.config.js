import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Вендори в окремі чанки — кешуються браузером незалежно від коду застосунку
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-supabase': ['@supabase/supabase-js'],
          'vendor-state': ['@reduxjs/toolkit', 'react-redux', 'i18next', 'react-i18next'],
        },
      },
    },
  },
})
