import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html']
    },
    setupFiles: path.resolve(__dirname, 'vitest.setup.ts'),
    css: false,
    server: {
      deps: {
        inline: [/vue-element-plus-x/]
      }
    }
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // 子包自己的 src
    }
  }
})
