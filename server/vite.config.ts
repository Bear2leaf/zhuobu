import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  publicDir: resolve(__dirname ,'..'),
  resolve: {
    alias: [
      {
        find: 'src',
        replacement: resolve(__dirname ,'src')
      },
    ]
  }
})

