import { fileURLToPath, URL } from 'node:url'
import { dirname, resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import autoImport from 'unplugin-auto-import/vite'

const __filenameNew = fileURLToPath(import.meta.url)
const __dirnameNew = dirname(__filenameNew)

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080
  },
  plugins: [
    vue(),
    vueJsx(),
    autoImport({
      imports: ['vue', 'pinia'],
      dts: resolve(__dirnameNew, 'types/autoImport.d.ts'),
      eslintrc: {
        enabled: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
