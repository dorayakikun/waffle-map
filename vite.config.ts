import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import * as fs from 'node:fs'

// Load package.json configuration
let packageConfig: { wafflemap?: { meshcalculator?: string } } = {};
try {
  const packageJsonPath = path.resolve(__dirname, 'package.json');
  const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');
  packageConfig = JSON.parse(packageJsonContent);
} catch (error) {
  console.warn('Could not load package.json configuration');
}

// https://vite.dev/config/
export default defineConfig({
  root: '.',
  plugins: [react()],
  define: {
    MESH_CALCULATOR_TYPE: JSON.stringify(packageConfig.wafflemap?.meshcalculator || 'basic'),
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