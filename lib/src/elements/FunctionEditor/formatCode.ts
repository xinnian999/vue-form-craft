/**
 * 手动格式化代码（处理基本的分号、换行、缩进）
 */
export const formatCode = (code: string): string => {
  if (!code || !code.trim()) return code

  let formatted = code.trim()

  // 1. 确保箭头函数 => 前后有空格
  formatted = formatted.replace(/(\w+)\s*=>/g, '$1 =>')
  formatted = formatted.replace(/\(([^)]+)\)\s*=>/g, '($1) =>')

  // 2. 在大括号前添加空格（如果还没有）
  formatted = formatted.replace(/([^}\s])\{/g, '$1 {')

  // 3. 处理函数体：将函数体内的语句按分号分割并格式化
  formatted = formatted.replace(/\{\s*([^}]+)\s*\}/g, (match, body) => {
    const trimmedBody = body.trim()
    if (!trimmedBody) return '{}'

    // 如果函数体只有一行且很短，保持单行格式
    if (!trimmedBody.includes(';') && trimmedBody.length < 40) {
      return `{ ${trimmedBody} }`
    }

    // 简单按分号分割语句
    const parts = trimmedBody.split(';')
    const statements: string[] = []

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i].trim()
      if (!part) continue

      // 如果不是最后一部分，添加分号
      if (i < parts.length - 1) {
        statements.push(part + ';')
      } else {
        // 最后一部分可能是 return 语句，不需要分号
        if (part.startsWith('return ')) {
          statements.push(part)
        } else if (part) {
          // 其他情况也添加分号
          statements.push(part + ';')
        }
      }
    }

    // 过滤空语句
    const validStatements = statements.filter((s) => s.trim())
    if (validStatements.length === 0) return '{}'

    // 如果只有一个语句且很短，保持单行
    if (validStatements.length === 1 && validStatements[0].length < 40) {
      return `{ ${validStatements[0]} }`
    }

    // 多个语句，每个语句一行，添加缩进，每个分号后换两行
    const indentedBody = validStatements.map((stmt: string) => '  ' + stmt).join('\n\n')

    return `{\n${indentedBody}\n}`
  })

  // 4. 处理缩进
  const lines = formatted.split('\n')
  let indentLevel = 0
  const indentSize = 2

  const formattedLines = lines.map((line) => {
    const trimmed = line.trim()

    // 保留空行
    if (!trimmed) return ''

    // 减少缩进（在闭合大括号前）
    if (trimmed.startsWith('}')) {
      indentLevel = Math.max(0, indentLevel - 1)
    }

    // 应用缩进
    const indented = ' '.repeat(indentLevel * indentSize) + trimmed

    // 增加缩进（在开放大括号后）
    if (trimmed.endsWith('{') && !trimmed.startsWith('}')) {
      indentLevel++
    }

    return indented
  })

  // 保留空行，不过滤
  formatted = formattedLines.join('\n')

  // 5. 清理多余的空行
  formatted = formatted.replace(/\n{3,}/g, '\n\n')

  return formatted.trim()
}

