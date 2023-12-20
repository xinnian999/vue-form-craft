const scpClient = require('scp2')
const ora = require('ora')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const deploy = () =>
  readline.question(`请输入服务器密码：`, (name) => {
    const server = {
      host: '101.42.108.39', //服务器IP
      port: 22, //服务器端口
      username: 'root', //服务器ssh登录用户名
      password: name, //服务器ssh登录密码
      path: '/www/wwwroot/vue-form-craft' //服务器web目录
    }

    const loading = ora('正在部署至 ' + server.host)
    loading.start()
    scpClient.scp('dist/', server, (err) => {
      loading.stop()

      if (err) {
        console.log(err)
        console.log('密码错误,请重新输入')
        deploy()
      } else {
        console.log('部署成功')
        readline.close()
      }
    })
  })

deploy()
