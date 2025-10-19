<template>
  <div :class="ns('save-json-edit')">
    <JsonEditor
      v-model="data as Record<string, any>"
      v-bind="$attrs"
      @init="onInit"
      @modeChange="onModeChange"
    />
    <div class="footer">
      <el-button @click="handleSave" type="primary">保存更改</el-button>
      <el-button @click="handleReset">重置</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any> = FormSchema">
import JsonEditorType from 'jsoneditor'
import { ref } from 'vue'
import { useDesignInstance } from '@/hooks'
import type { FormSchema } from '@/types'
import type { GetCompletionItems } from '@/types/complete'
import { ns, removeDesignKeys, restoreDesignKeys } from '@/utils'
import JsonEditor from '../JsonEditor.vue'
import autoComplete from './autoComplete'

const props = defineProps<{
  json: T
  customGetCompletionItems?: GetCompletionItems
}>()

const emits = defineEmits<{
  save: [json: T]
}>()

// 初始化时移除 designKey 显示
const data = ref<T>(removeDesignKeys(props.json) as T)

const designInstance = useDesignInstance()

const onInit = (editor: JsonEditorType) => {
  autoComplete(editor, props.customGetCompletionItems, designInstance.schema)
}

const onModeChange = (newMode: string, editor: JsonEditorType) => {
  if (newMode === 'code') {
    autoComplete(editor, props.customGetCompletionItems, designInstance.schema)
  }
}

const handleSave = () => {
  // 保存时恢复 designKey 字段
  const restoredData = restoreDesignKeys(data.value, props.json)
  emits('save', restoredData as T)
}

const handleReset = () => {
  data.value = removeDesignKeys(props.json)
}
</script>

<style scoped lang="scss">
@import '@/style.scss';

@include ns('save-json-edit') {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .footer {
    text-align: center;
  }
}
</style>
