// 性能优化：缓存路径解析结果
const pathCache = new Map<string, string[]>()

/**
 * 解析路径字符串，支持数组索引语法
 * 例如：'rules[0].required' => ['rules', '0', 'required']
 */
export function parsePath(path: string): string[] {
  // 尝试从缓存获取
  const cached = pathCache.get(path)
  if (cached) {
    return cached
  }

  const result = path
    .replace(/\[(\d+)\]/g, '.$1') // 将 [0] 转换为 .0
    .split('.')
    .filter((key) => key !== '') // 过滤空字符串

  // 限制缓存大小，避免内存泄漏
  if (pathCache.size > 200) {
    // 清除最早的缓存项（LRU策略）
    const firstKey = pathCache.keys().next().value
    if (firstKey !== undefined) {
      pathCache.delete(firstKey)
    }
  }
  pathCache.set(path, result)

  return result
}
