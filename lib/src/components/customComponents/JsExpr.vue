<template>
  <div>
    <Button type="primary" plain size="small" @click="visible = true">JS表达式</Button>
    <Modal
      v-model="visible"
      title="JS表达式"
      append-to-body
      destroy-on-close
      @close="handleClose"
      width="700px"
    >
      <div :class="ns('js-expr-dialog')">
        <!-- AI生成区域 -->
        <div v-if="isAiAvailable" class="ai-section">
          <div class="ai-input-wrapper">
            <Input
              v-model="aiPrompt"
              placeholder="描述你想要的JS表达式功能，例如：判断年龄是否大于18岁"
              clearable
            >
              <template #append>
                <Button type="primary" icon="magic" @click="handleAiGenerate" :loading="aiLoading">
                  AI生成
                </Button>
              </template>
            </Input>
          </div>
        </div>

        <!-- 表达式输入区域 -->
        <div class="expr-section">
          <Textarea
            v-model="expr"
            :rows="8"
            placeholder="请输入JS表达式，例如：{{ $values.age > 18 }}"
          />
        </div>
      </div>
      <template #footer>
        <Button @click="visible = false">取消</Button>
        <Button type="primary" @click="handleSave">保存</Button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Icon } from '@/components'
import { useAi, useDesignInstance, useUI } from '@/hooks'
import { ns } from '@/utils'

const { Button, Modal, Message, Input, Textarea } = useUI()

const modelValue = defineModel<string>()

const visible = ref<boolean>()

const expr = ref<string>()

// AI相关
const { isAvailable: isAiAvailable, request: aiRequest } = useAi()
const designInstance = useDesignInstance()
const aiPrompt = ref('')
const aiLoading = ref(false)

onMounted(() => {
  expr.value = modelValue.value
})

const handleClose = () => {
  expr.value = modelValue.value
  aiPrompt.value = ''
}

const handleSave = () => {
  modelValue.value = expr.value
  visible.value = false
}

// 提取表单字段名称
const extractFieldNames = (items: any[]): string[] => {
  const names: string[] = []
  const traverse = (itemList: any[]) => {
    itemList.forEach((item) => {
      if (item.name) {
        names.push(item.name)
      }
      if (item.items && Array.isArray(item.items)) {
        traverse(item.items)
      }
    })
  }
  traverse(items)
  return names
}

// AI生成JS表达式
const handleAiGenerate = async () => {
  if (!aiPrompt.value.trim()) {
    Message.warning('请输入生成需求')
    return
  }

  aiLoading.value = true

  try {
    // 获取当前表单schema
    const schema = designInstance?.getSchema()
    const schemaInfo = schema
      ? `\n## 当前表单Schema信息：\n${JSON.stringify(schema, null, 2)}\n\n根据以上Schema，$values对象中包含的字段有：${extractFieldNames(schema.items || []).join(', ')}`
      : ''

    const prompt = `你是一个JS表达式生成助手。请根据用户需求生成一个符合Vue Form Craft模板语法的JS表达式。

## 模板语法规则：
1. 表达式必须用 {{ }} 包裹
2. 表达式类型：
   - 普通表达式：{{ $values.username }}
   - 条件判断：{{ $values.age > 18 }}
   - 函数表达式：{{ () => $values.age > 18 }}
   - 带参数函数：{{ (value) => $instance.setFieldValue("city", value) }}

## 可用的全局变量：
- $values: 表单所有值
- $selectData: 选择器组件的源数据
- $instance: 表单实例API
- $item: FormList中当前行数据
- $index: FormList中当前行索引${schemaInfo}

## 用户需求：
${aiPrompt.value}

## 要求：
1. 只返回生成的JS表达式，不要有任何其他说明文字
2. 表达式必须用 {{ }} 包裹
3. 确保语法正确且符合上述规则
4. 如果需要函数，使用箭头函数语法
5. 根据Schema信息，使用正确的字段名称`

    const result = await aiRequest(prompt)

    if (result) {
      const generatedExpr = typeof result === 'string' ? result.trim() : JSON.stringify(result)
      expr.value = generatedExpr
      aiPrompt.value = ''
      Message.success('AI生成成功')
    }
  } catch (error: any) {
    console.error('AI生成失败:', error)
    Message.error(error?.message || 'AI生成失败')
  } finally {
    aiLoading.value = false
  }
}
</script>

<style lang="scss">
@import '@/style';

@include ns('js-expr-dialog') {
  .ai-section {
    margin-bottom: 16px;
    padding: 16px;
    background-color: $bgColor2;
    border-radius: 4px;

    .ai-input-wrapper {
      margin-bottom: 12px;
    }

    .tips {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      font-size: 12px;
      color: $textColor3;

      .tip-title {
        font-weight: 600;
        color: $textColor1;
      }

      .tip-item {
        padding: 2px 8px;
        background-color: $bgColor;
        border-radius: 3px;
        font-family: monospace;
        font-size: 11px;
        color: $themeColor;
      }
    }
  }
}
</style>
