import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.poiskkino.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/v1.4'),
        headers: {
          'X-API-KEY': 'Q056TDQ-1X24APY-QVJ576P-FY195X1'
        }
      }
    }
  }
})