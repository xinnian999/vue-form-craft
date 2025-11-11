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

### 3. git_diff
查看当前的改动内容（包括已暂存和未暂存的改动）

```
使用 git_diff 工具查看当前改动
```

### 4. git_smart_commit（智能提交）
AI 先读取改动内容，生成合适的 commit 信息后再提交并推送

```
帮我智能提交代码（AI 会自动调用 git_diff 分析改动，生成 commit 信息后提交）
```

## 工具说明

- **git_auto_push**: 一键完成 add、commit、push 操作
  - 参数：message (可选，默认为 "chore: 自动提交")
  
- **git_status**: 查看当前 git 仓库状态

- **git_diff**: 查看当前的改动内容
  - 显示已暂存的改动（git diff --cached）
  - 显示未暂存的改动（git diff）
  - 显示文件状态概览

- **git_smart_commit**: 智能提交代码
  - 参数：message (必填，AI 生成的 commit 信息)
  - 自动执行 add、commit、push 操作

## 智能提交工作流

1. 你对 AI 说："帮我智能提交代码"
2. AI 自动调用 `git_diff` 查看你的改动
3. AI 分析改动内容，生成符合规范的 commit 信息
4. AI 调用 `git_smart_commit` 提交并推送代码
