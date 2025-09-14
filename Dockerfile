# 使用官方 Node.js Alpine 镜像作为基础镜像
FROM crpi-a7p27yxlrmekg1a3.cn-beijing.personal.cr.aliyuncs.com/elin-common/node-18 AS build

# 设置工作目录
WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制文件到工作目录
COPY . .

RUN pnpm install

RUN pnpm build

RUN pnpm docs:build

# 使用官方 nginx 镜像作为部署环境
FROM crpi-a7p27yxlrmekg1a3.cn-beijing.personal.cr.aliyuncs.com/elin-common/nginx AS deploy

# 复制自定义 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 将构建好的静态文件复制到 nginx 默认路径
COPY --from=build /app/docs/.vitepress/dist /usr/share/nginx/html/vue-form-craft

# 暴露 80 端口
EXPOSE 80

# 启动 nginx，访问localhost:9999/vue-form-craft/zh
CMD ["nginx", "-g", "daemon off;"]

