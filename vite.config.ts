import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

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
        includePaths: ['node_modules', 'src', 'src/style'],
      },
    },
  },
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
