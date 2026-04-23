import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Use a dynamic base path so GitHub Pages works for any repository name.
  base: process.env.VITE_BASE_PATH || '/',
})
