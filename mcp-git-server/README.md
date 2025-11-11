# Git MCP Server

自动执行 git 操作的 MCP 服务器

## 安装

```bash
cd mcp-git-server
npm install
```

## 配置 Windsurf

在 Windsurf 设置中添加 MCP 服务器配置：

1. 打开 Windsurf 设置
2. 找到 MCP Servers 配置
3. 添加以下配置：

```json
{
  "mcpServers": {
    "git-auto": {
      "command": "node",
      "args": ["/Users/v_huyilin/Documents/hyl/vue-form-craft/mcp-git-server/index.js"]
    }
  }
}
```

## 使用

配置完成后，在 Cascade 中可以使用以下工具：

### 1. git_auto_push
自动执行 `git add . && git commit && git push`

```
使用 git_auto_push 工具提交代码，commit 信息为 "feat: 完成表单重构"
```

### 2. git_status
查看 git 状态

```
使用 git_status 工具查看当前状态
```

## 工具说明

- **git_auto_push**: 一键完成 add、commit、push 操作
  - 参数：message (可选，默认为 "chore: 自动提交")
  
- **git_status**: 查看当前 git 仓库状态
