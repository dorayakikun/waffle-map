import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    LOGIC_TYPE: JSON.stringify(process.env.LOGIC_TYPE || 'basic'),
  },
  build: {
    outDir: 'dist',
    assetsDir: '',
  },
  server: {
    port: 3000,
    open: true,
  },
  publicDir: 'public',
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
})