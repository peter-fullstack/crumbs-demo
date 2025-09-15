import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
  test: {
    globals: true,           // allows using `test`, `expect`, etc.
    environment: "jsdom",    // simulates a browser
    setupFiles: "./src/setupTests.ts",
  },
})
