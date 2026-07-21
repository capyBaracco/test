import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/api' : {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
<<<<<<< HEAD
})
=======
})
>>>>>>> 3b4f0450ecf1bd65bea1da84344f89734a1eaeca
