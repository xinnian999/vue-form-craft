#!/usr/bin/env bash
#
# 本地构建 VitePress 文档并推送到服务器（Caddy 直接静态托管）。
#
# 用法：
#   pnpm docs:release
#   或： bash scripts/deploy-docs.sh
#
# 可用环境变量覆盖默认值：
#   DEPLOY_SERVER  目标服务器 SSH 地址，默认 root@8.141.0.39
#   DEPLOY_PATH    服务器上的静态目录（容器 /srv 的宿主机映射），默认 /root/caddy/www/vue-form-craft
#
# 说明：Caddy 已把 /root/caddy/www 挂载到容器 /srv，站点配置见 deploy/formcraft.caddy
# （对应服务器 /root/caddy/sites/formcraft.caddy）。推完即生效，无需重载 Caddy。
set -euo pipefail

SERVER="${DEPLOY_SERVER:-root@8.141.0.39}"
TARGET="${DEPLOY_PATH:-/root/caddy/www/vue-form-craft}"

cd "$(dirname "$0")/.."

echo "📦 安装依赖..."
pnpm install --frozen-lockfile

echo "🔨 构建组件库 (vue-form-craft)..."
pnpm build

echo "📚 构建文档站..."
pnpm docs:build

echo "🚀 推送到 ${SERVER}:${TARGET} ..."
ssh "${SERVER}" "mkdir -p ${TARGET}"
rsync -az --delete docs/.vitepress/dist/ "${SERVER}:${TARGET}/"

echo "✅ 部署完成： https://form.elin521.cn/"
