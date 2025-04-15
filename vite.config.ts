/// <reference types="vitest" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  test: {
    silent: true,
    globals: true,
    mockReset: true,
    environment: 'jsdom',
    include: ['**/tests.{ts,tsx}'],
    setupFiles: './vitest.setup.ts',
  },
})
