import { execSync } from 'child_process'

const imageName = 'crpi-a7p27yxlrmekg1a3.cn-beijing.personal.cr.aliyuncs.com/elin/formora:latest'

execSync(`docker build --no-cache -t ${imageName} .`, {
  stdio: 'inherit'
})
execSync(`docker push ${imageName}`, { stdio: 'inherit' })
