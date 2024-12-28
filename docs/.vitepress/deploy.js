import scpClient from 'scp2';
import ora from 'ora';
import readline from 'readline';
import fs from 'fs';

const deploy = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('请输入服务器密码：', (password) => {
    const server = {
      host: '8.141.86.20', // 服务器IP
      port: 22, // 服务器端口
      username: 'root', // 服务器ssh登录用户名
      password: password, // 服务器ssh登录密码
      path: '/www/wwwroot/my-blog', // 服务器web目录
      readyTimeout: 20000, // SSH 连接超时
      algorithms: {
        kex: ['diffie-hellman-group-exchange-sha256'], // 使用与服务器匹配的密钥交换算法
      },
      hostKeys: ['ssh-rsa', 'ssh-ed25519', 'rsa-sha2-512'], // 明确指定支持的主机密钥格式
      debug: (message) => {
        console.log('SSH Debug:', message); // 打印 SSH 调试信息
      },
    };

    const loading = ora(`正在部署至 ${server.host}`);
    loading.start();

    const distPath = './dist/';
    if (!fs.existsSync(distPath) || !fs.readdirSync(distPath).length) {
      console.log('本地 dist/ 目录为空或不存在');
      loading.stop();
      rl.close();
      return;
    }

    scpClient.scp(distPath, server, (err) => {
      loading.stop();
      if (err) {
        console.error('部署失败:', err);
        console.log('密码错误，请重新输入');
        rl.close();
        deploy();
      } else {
        console.log('部署成功');
        rl.close();
      }
    });
  });
};

deploy();
