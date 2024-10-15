import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['web-ifc-viewer']
  },
  build: {
    commonjsOptions: {
      include: [/web-ifc-viewer/, /node_modules/]
    }
  },
  resolve: {
    dedupe: ['three']
  }
})