import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8443,
    host: true,
    https: true,
    open: true,
    proxy: {
      '/api': {
        target: 'https://cors-anywhere.citadel.red',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'build',
    sourcemap: true,
  },
})
