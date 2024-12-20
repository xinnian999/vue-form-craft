import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import libCss from 'vite-plugin-libcss'
import dts from 'vite-plugin-dts'

export default defineConfig({
  base: '/vue-form-craft/',
  plugins: [
    vue(),
    dts({
      outDir: './dist',
      include: ['../../packages/**/*', '../../packages/**/*.vue'],
      pathsToAliases: true,
      rollupTypes: true
    }),
    libCss()
  ],
  resolve: {
    alias: {
      '@vue-form-craft': fileURLToPath(new URL('../../packages', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('index.ts', import.meta.url)), //指定组件编译入口文件
      name: 'VueFormCraft', // umd全局变量名
      fileName: 'vue-form-craft', // 打包文件名
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue','element-plus'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
        },
        exports: 'named',
        chunkFileNames:'lazy/[name]-[hash].js'
      }
    }
    // sourcemap: true
  }
})
