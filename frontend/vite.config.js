import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function netlifyRedirectsPlugin() {
  return {
    name: 'netlify-redirects',
    closeBundle() {
      const src = path.resolve(__dirname, '_redirects')
      const dest = path.resolve(__dirname, 'dist', '_redirects')

      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest)
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), netlifyRedirectsPlugin()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Backend server URL
      }
    }
  }
})
