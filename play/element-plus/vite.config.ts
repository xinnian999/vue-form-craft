import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const { COZE_API_KEY } = loadEnv(mode, process.cwd(), '')


  return {
    plugins: [
      vue(),
    ],
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
            Authorization: `Bearer ${COZE_API_KEY}`
          }
        }
      }
    }
  }
})
