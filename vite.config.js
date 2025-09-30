import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  "deploy": "gh-pages -d dist",
  base: '/Tenzies-game/',
  plugins: [react()],
})
