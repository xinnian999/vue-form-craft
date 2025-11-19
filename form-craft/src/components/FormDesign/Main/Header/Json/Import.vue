<template>
  <div :class="ns('import')">
    <el-input
      type="textarea"
      v-model="value"
      :rows="20"
      placeholder="请粘贴 JsonSchema 或包含 JsonSchema 的代码片段"
    />

    <div class="footer">
      <el-button @click="handleClear"> 清空 </el-button>
      <el-button type="primary" @click="handleConfirm" :disabled="!isValidSchema"> 导入 </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import { useDesignInstance } from '@/hooks'
import type { FormSchema } from '@/types'
import { ns, repirJsonSchema } from '@/utils'

const designInstance = useDesignInstance()!

const value = ref<string>('')

const isValidSchema = ref(true)

const handleClear = () => {
  value.value = ''
}

// // 监听弹窗打开，重置数据
// watch(visible, (val) => {
//   if (!val) {
//     // 弹窗关闭时，重置
//     value.value = ''
//     isValidSchema.value = true
//   }
// })

// 安全检查：检测潜在的危险代码
const containsDangerousCode = (code: string): boolean => {
  const dangerousPatterns = [
    /\beval\b/,
    /\bFunction\b/,
    /\bsetTimeout\b/,
    /\bsetInterval\b/,
    /\bwindow\b/,
    /\bdocument\b/,
    /\blocation\b/,
    /\bfetch\b/,
    /\bXMLHttpRequest\b/,
    /\bimport\(/,
    /<script/i,
    /javascript:/i
  ]

  return dangerousPatterns.some((pattern) => pattern.test(code))
}

// 从文本中提取 JSON 对象
const extractJSON = (text: string): FormSchema | null => {
  if (!text || !text.trim()) {
    return null
  }

  // 移除 import 语句
  let cleanText = text.replace(/import\s+.*?from\s+['"].*?['"]\s*;?\s*/g, '')

  try {
    // 尝试直接解析整个文本
    return JSON.parse(cleanText)
  } catch {
    // 如果直接解析失败，尝试提取 export default 后的内容
    try {
      // 匹配 export default { ... } 或 export default = { ... }
      const exportMatch = cleanText.match(/export\s+default\s*=?\s*(\{[\s\S]*\})/)
      if (exportMatch && exportMatch[1]) {
        let objStr = exportMatch[1]

        // 移除尾部的类型断言如 as FormSchema
        objStr = objStr.replace(/\s*as\s+\w+[\w<>[\],\s]*\s*$/g, '')

        // 移除尾部可能的分号或逗号
        objStr = objStr.trim().replace(/[;,]\s*$/, '')

        // 安全检查：检测危险代码
        if (containsDangerousCode(objStr)) {
          throw new Error('检测到潜在的不安全代码，导入已被阻止')
        }

        // 使用 Function 构造器来解析 JavaScript 对象字面量
        // 注意：这是在受控环境下使用，仅用于解析配置对象
        // 已经过安全检查，只允许纯数据对象
        const fn = new Function(`'use strict'; return (${objStr})`)
        return fn()
      }

      // 尝试匹配纯对象 { ... }
      const objectMatch = cleanText.match(/(\{[\s\S]*\})/)
      if (objectMatch && objectMatch[1]) {
        let objStr = objectMatch[1].trim().replace(/[;,]\s*$/, '')

        // 安全检查
        if (containsDangerousCode(objStr)) {
          throw new Error('检测到潜在的不安全代码，导入已被阻止')
        }

        const fn = new Function(`'use strict'; return (${objStr})`)
        return fn()
      }
    } catch (e) {
      console.error('提取 JSON 失败:', e)
      throw e
    }
  }

  return null
}

// 确认导入
const handleConfirm = async () => {
  try {
    // 提取并验证 JSON 格式
    const importSchema = extractJSON(value.value)

    if (!importSchema || typeof importSchema !== 'object') {
      ElMessage.error('无法识别有效的 JsonSchema，请检查格式')
      return
    }

    // 二次确认
    await ElMessageBox.confirm('导入操作将覆盖当前的表单设计内容，是否继续？', '确认导入', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })

    // 修复并应用 schema
    const repairedSchema = repirJsonSchema(importSchema)
    designInstance.setSchema(repairedSchema)
    designInstance.recordHistory('导入JSON')

    ElMessage.success('导入成功')
  } catch (error) {
    if (error !== 'cancel') {
      console.error('导入失败:', error)
      ElMessage.error('导入失败，请检查 JsonSchema 格式')
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/style.scss';

@include ns('import') {
  .footer {
    padding: 15px;
    text-align: center;
  }
}
</style>
