const extractJsonFromText = (text: string) => {
  if (!text) return null
  // 去掉 markdown 代码块标记
  const match = text.match(/```json([\s\S]*?)```/)
  if (match) {
    return match[1].trim()
  }
  return text.trim()
}

export default extractJsonFromText
