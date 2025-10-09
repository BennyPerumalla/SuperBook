/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // --- ADDED THIS SECTION ---
  // This configures Vitest to run your unit tests.
  test: {
    // This tells Vitest to use a JSDOM environment for testing React components.
    environment: 'jsdom',
    // This is the key fix: it tells Vitest to IGNORE the folder 
    // where your Playwright E2E tests are located.
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      'tests/**', // Exclude the Playwright E2E tests directory
    ],
  },
}));

