import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { ViteWebfontDownload } from 'vite-plugin-webfont-dl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    ViteWebfontDownload([
      'https://fonts.googleapis.com/css2?family=Courier+Prime&family=Open+Sans&display=swap',
    ]),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `@import "@/assets/sass/_variables.sass"\n`,
      },
    },
  },
})
