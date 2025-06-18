import { defineConfig } from 'vitest/config'
import rootConfig from '../../vitest.config'
import path from 'path'


export default defineConfig({
  ...rootConfig,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // 子包自己的 src
    }
  },
})
