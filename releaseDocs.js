import { execSync } from 'child_process'
import path from 'path'
import dotenv from 'dotenv'

// 加载 .env 文件
dotenv.config({ path: path.resolve(process.cwd(), 'play/vue-form-craft/.env') })

const imageName =
  'crpi-a7p27yxlrmekg1a3.cn-beijing.personal.cr.aliyuncs.com/elin/vue-form-craft:latest'

execSync(`docker build --build-arg COZE_TOKEN=${process.env.VITE_COZE_TOKEN} -t ${imageName} .`, {
  stdio: 'inherit'
})
execSync(`docker push ${imageName}`, { stdio: 'inherit' })
