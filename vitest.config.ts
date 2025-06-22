/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
    },
    include: ['**/__tests__/*.+(ts|tsx|js|jsx)', '**/*.{test,spec}.+(ts|tsx|js|jsx)'],
  },
})