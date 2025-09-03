import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // 👈 Changed from 3000 to 5000
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
