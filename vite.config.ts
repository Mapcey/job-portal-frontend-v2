import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),],
  server: {
    proxy: {
      '/auth': {
        target: 'http://46.62.192.148/api2',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/auth/, '/api2/auth'),
      },
      '/user': {
        target: 'http://46.62.192.148/api2',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/user/, '/api2/user'),
      },
      '/jobs': {
        target: 'http://46.62.192.148/api2',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/jobs/, '/api2/jobs'),
      },
      '/seekers': {
        target: 'http://46.62.192.148/api2',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/seekers/, '/api2/seekers'),
      },
      '/employers': {
        target: 'http://46.62.192.148/api2',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/employers/, '/api2/employers'),
      },
      '/editors': {
        target: 'http://46.62.192.148/api2',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/editors/, '/api2/editors'),
      },
      '/seeker_files': {
        target: 'http://46.62.192.148/api2',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/seeker_files/, '/api2/seeker_files'),
      },
    },
  },
})