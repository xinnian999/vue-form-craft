#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 项目根目录（mcp-git-server 的上级目录）
const PROJECT_ROOT = path.resolve(__dirname, '..');

class GitMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'git-auto-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    
    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'git_auto_push',
          description: '自动执行 git add . && git commit && git push',
          inputSchema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                description: 'commit 信息',
                default: 'chore: 自动提交',
              },
            },
          },
        },
        {
          name: 'git_status',
          description: '查看 git 状态',
          inputSchema: {
            type: 'object',
            properties: {},
          },
        },
        {
          name: 'git_diff',
          description: '查看当前的改动内容（git diff 和 git diff --cached），用于生成 commit 信息',
          inputSchema: {
            type: 'object',
            properties: {},
          },
        },
        {
          name: 'git_smart_commit',
          description: '智能提交：先读取改动内容，AI 生成合适的 commit 信息后再提交并推送',
          inputSchema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                description: 'AI 生成的 commit 信息',
              },
            },
            required: ['message'],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      if (request.params.name === 'git_auto_push') {
        const message = request.params.arguments?.message || 'chore: 自动提交';
        
        try {
          // 执行 git add .
          execSync('git add .', {
            cwd: PROJECT_ROOT,
            encoding: 'utf-8',
          });

          // 执行 git commit
          const commitResult = execSync(`git commit -m "${message}"`, {
            cwd: PROJECT_ROOT,
            encoding: 'utf-8',
          });

          // 执行 git push
          const pushResult = execSync('git push', {
            cwd: PROJECT_ROOT,
            encoding: 'utf-8',
          });

          return {
            content: [
              {
                type: 'text',
                text: `✅ Git 操作成功完成！\n\n📝 Commit: ${message}\n\n${commitResult}\n${pushResult}`,
              },
            ],
          };
        } catch (error) {
          return {
            content: [
              {
                type: 'text',
                text: `❌ Git 操作失败：\n${error.message}\n${error.stderr || ''}`,
              },
            ],
            isError: true,
          };
        }
      }

      if (request.params.name === 'git_status') {
        try {
          const statusResult = execSync('git status', {
            cwd: PROJECT_ROOT,
            encoding: 'utf-8',
          });

          return {
            content: [
              {
                type: 'text',
                text: statusResult,
              },
            ],
          };
        } catch (error) {
          return {
            content: [
              {
                type: 'text',
                text: `❌ 获取 git 状态失败：\n${error.message}`,
              },
            ],
            isError: true,
          };
        }
      }

      if (request.params.name === 'git_diff') {
        try {
          // 获取未暂存的改动
          let unstagedDiff = '';
          try {
            unstagedDiff = execSync('git diff', {
              cwd: PROJECT_ROOT,
              encoding: 'utf-8',
            });
          } catch (e) {
            // 可能没有未暂存的改动
          }

          // 获取已暂存的改动
          let stagedDiff = '';
          try {
            stagedDiff = execSync('git diff --cached', {
              cwd: PROJECT_ROOT,
              encoding: 'utf-8',
            });
          } catch (e) {
            // 可能没有已暂存的改动
          }

          // 获取状态信息
          const statusResult = execSync('git status --short', {
            cwd: PROJECT_ROOT,
            encoding: 'utf-8',
          });

          let result = '📊 Git 改动概览：\n\n';
          result += `${statusResult}\n`;
          
          if (stagedDiff) {
            result += '\n📝 已暂存的改动 (git diff --cached)：\n';
            result += '```diff\n' + stagedDiff + '\n```\n';
          }
          
          if (unstagedDiff) {
            result += '\n📝 未暂存的改动 (git diff)：\n';
            result += '```diff\n' + unstagedDiff + '\n```\n';
          }

          if (!stagedDiff && !unstagedDiff) {
            result += '\n✅ 没有检测到改动';
          }

          return {
            content: [
              {
                type: 'text',
                text: result,
              },
            ],
          };
        } catch (error) {
          return {
            content: [
              {
                type: 'text',
                text: `❌ 获取 git diff 失败：\n${error.message}`,
              },
            ],
            isError: true,
          };
        }
      }

      if (request.params.name === 'git_smart_commit') {
        const message = request.params.arguments?.message;
        
        if (!message) {
          return {
            content: [
              {
                type: 'text',
                text: '❌ 请提供 commit 信息',
              },
            ],
            isError: true,
          };
        }

        try {
          // 执行 git add .
          execSync('git add .', {
            cwd: PROJECT_ROOT,
            encoding: 'utf-8',
          });

          // 执行 git commit
          const commitResult = execSync(`git commit -m "${message}"`, {
            cwd: PROJECT_ROOT,
            encoding: 'utf-8',
          });

          // 执行 git push
          const pushResult = execSync('git push', {
            cwd: PROJECT_ROOT,
            encoding: 'utf-8',
          });

          return {
            content: [
              {
                type: 'text',
                text: `✅ 智能提交成功！\n\n📝 Commit: ${message}\n\n${commitResult}\n${pushResult}`,
              },
            ],
          };
        } catch (error) {
          return {
            content: [
              {
                type: 'text',
                text: `❌ 智能提交失败：\n${error.message}\n${error.stderr || ''}`,
              },
            ],
            isError: true,
          };
        }
      }

      throw new Error(`Unknown tool: ${request.params.name}`);
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Git MCP server running on stdio');
  }
}

const server = new GitMCPServer();
server.run().catch(console.error);
