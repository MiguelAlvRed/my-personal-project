import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/leaflet/dist/images/*',
          dest: 'assets/leaflet'
        }
      ]
    })
  ],
  server: {
    host: true, // Listen on all network interfaces
    port: 5173,
    strictPort: true,
    open: true // Automatically open browser
  },
  preview: {
    port: 5173,
    strictPort: true
  },
  optimizeDeps: {
    exclude: ['leaflet']
  }
})
