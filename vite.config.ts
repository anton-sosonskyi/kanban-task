/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: `/kanban-task/`,
  plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './setupTests.ts',
    },
  resolve: {
    alias: {
      'node-fetch': 'isomorphic-fetch',
    },
  },
});
