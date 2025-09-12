import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const { COZE_TOKEN } = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../packages/element-plus/src', import.meta.url))
      }
    },
    server: {
      host: true,
      proxy: {
        '/coze-api': {
          target: 'https://api.coze.cn',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/coze-api/, ''),
          headers: {
            Authorization: `Bearer ${COZE_TOKEN}`
          }
        }
      }
    }
  }
})
