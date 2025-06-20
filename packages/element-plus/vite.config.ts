import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import libCss from 'vite-plugin-libcss'
import dts from 'vite-plugin-dts'

export default defineConfig({
  base: '/form-magic/',
  plugins: [
    vue(),
    libCss(),
    dts({
      rollupTypes: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@form-magic/core': fileURLToPath(new URL('../core/index.ts', import.meta.url)),
      '@form-magic/components': fileURLToPath(new URL('../components/index.ts', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('src/index.ts', import.meta.url)), //指定组件编译入口文件
      name: 'FormMagic', // umd全局变量名
      fileName: 'form-magic' // 打包文件名
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'element-plus'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus'
        },
        exports: 'named',
        chunkFileNames: 'lazy/[name]-[hash].js'
      }
    }
    // sourcemap: true
  }
})
