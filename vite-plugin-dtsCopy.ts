// vite-plugin-copy-dts.js

import fs from 'fs'
import path from 'path'

export default function copyDTSToDist() {
  return {
    name: 'copy-dts-to-dist',
    generateBundle(options, bundle) {
      // 获取 src 目录下所有的 .d.ts 文件
      const dtFiles = fs
        .readdirSync(path.resolve(__dirname, 'src'))
        .filter((file) => file.endsWith('.d.ts'))

      // 确保 dist/types/src 目录存在
      const distDir = path.resolve(__dirname, 'dist', 'types', 'src')
      if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true })
      }

      // 复制 .d.ts 文件到 dist/types/src 目录下
      dtFiles.forEach((dtFile) => {
        const srcPath = path.resolve(__dirname, 'src', dtFile)
        const distPath = path.resolve(__dirname, 'dist', 'types', 'src', dtFile)
        fs.copyFileSync(srcPath, distPath)
      })
    }
  }
}
