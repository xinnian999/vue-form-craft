// vitest.setup.ts
const originalWarn = console.warn

console.warn = (...args) => {
  const message = args[0]
  // 屏蔽 Vue 的 vnode undefined 警告
  if (typeof message === 'string' && message.includes('Invalid vnode type')) {
    return
  }
  originalWarn(...args)
}
