/// <reference types="vitest" />

import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'setup-vitest.ts',
    /**
     * for in-source testing.
     * {@link https://vitest.dev/guide/in-source.html}
     */
    includeSource: ['src/**/*.{ts,tsx}'],
  },
})