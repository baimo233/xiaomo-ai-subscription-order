import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  base: command === 'build' ? '/xiaomo-ai-subscription-order/' : '/',
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
  },
}))
