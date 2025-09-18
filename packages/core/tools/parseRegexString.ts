function unwrapRegexString(str: string) {
  // 判断是否以 / 开头并以 / 结尾
  if (str.startsWith('/') && str.endsWith('/')) {
    return str.slice(1, -1) // 去掉开头和结尾的 /
  }
  return str // 没有 / 的原样返回
}

export default unwrapRegexString
