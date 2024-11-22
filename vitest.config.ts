import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  test: {
    // 自定义选项，例如包含测试文件的目录等
    globals: true,
    environment: 'jsdom', // 如果你进行前端测试，通常使用 'jsdom'
    coverage: {
      reporter: ['text', 'json', 'html']
    },
    // include: ['packages/**/*.test.{js,ts,tsx,vue}'],
  },
  plugins: [vue(),vueJsx()]
})
