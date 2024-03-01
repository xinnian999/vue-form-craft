import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import libCss from 'vite-plugin-libcss'
import dts from 'vite-plugin-dts'
import dtsCopy from './vite-plugin-dtsCopy.ts'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  const config = {
    plugins: [
      vue(),
      dts({
        outDir: './dist/types',
        rollupTypes: false
        // include: ['src/release/**/*', 'src/components/**/*']
      }),
      dtsCopy(),
      vueJsx(),
      viteCommonjs(),
      libCss()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      open: true
    },
    assetsInclude: ['**/*.md']
  }

  //发布到npm的打包配置
  if (env.VITE_App_RELEASE) {
    return {
      ...config,
      build: {
        lib: {
          entry: fileURLToPath(new URL('./src/release/index.ts', import.meta.url)), //指定组件编译入口文件
          name: 'vue-form-craft', // 包名
          fileName: 'vue-form-craft' // 打包文件名
        },
        rollupOptions: {
          // 确保外部化处理那些你不想打包进库的依赖
          external: ['vue'],
          output: {
            // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
            globals: {
              vue: 'Vue'
            }
          }
        }
        // sourcemap: true
      }
    }
  }

  return config
})
