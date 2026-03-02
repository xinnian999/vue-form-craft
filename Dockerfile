FROM crpi-a7p27yxlrmekg1a3.cn-beijing.personal.cr.aliyuncs.com/elin-common/node-18 AS build

# 设置工作目录
WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 切换 npm/pnpm 源到淘宝镜像，降低 install 失败率
RUN npm config set registry https://registry.npmmirror.com
RUN pnpm config set registry https://registry.npmmirror.com

# 复制文件到工作目录
COPY . .

RUN pnpm install

RUN pnpm build

RUN pnpm docs:build

FROM crpi-a7p27yxlrmekg1a3.cn-beijing.personal.cr.aliyuncs.com/elin-common/nginx AS deploy

# 将构建好的静态文件复制到 nginx 默认路径
COPY --from=build /app/docs/.vitepress/dist /usr/share/nginx/html/vue-form-craft

# 暴露 80 端口
EXPOSE 80

# 启动 nginx，访问localhost:9999/vue-form-craft/zh
CMD ["nginx", "-g", "daemon off;"]
