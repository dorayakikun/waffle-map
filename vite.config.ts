import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import process from 'node:process'

// https://vite.dev/config/
export default defineConfig({
  root: '.',
  plugins: [react()],
  define: {
    LOGIC_TYPE: JSON.stringify(process.env.LOGIC_TYPE || 'basic'),
  },
  build: {
    outDir: 'dist',
    assetsDir: '',
    target: 'es2022',
    minify: 'esbuild',
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 4173,
  },
  publicDir: 'public',
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  esbuild: {
    target: 'es2022',
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2022',
    },
  },
})