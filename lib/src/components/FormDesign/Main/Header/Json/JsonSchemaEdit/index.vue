<template>
  <div :class="ns('save-json-edit')">
    <JsonEditor
      v-model="data"
      style="height: 70vh"
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

<script setup lang="ts">
import JsonEditorType from 'jsoneditor'
import { cloneDeep } from 'lodash'
import { onMounted, ref } from 'vue'
import { JsonEditor } from '@/components'
import { useDesignInstance } from '@/hooks'
import type { FormSchema } from '@/types'
import type { GetCompletionItems } from '@/types/complete'
import { ns } from '@/utils'
import autoComplete from './autoComplete'

const props = defineProps<{
  json: FormSchema
  customGetCompletionItems?: GetCompletionItems
}>()

const emits = defineEmits<{
  save: [json: FormSchema]
  init: [editor: JsonEditorType]
}>()

// 初始化时移除 designKey 显示
const data = ref<FormSchema>({ items: [] })

const designInstance = useDesignInstance()!

const onInit = (editor: JsonEditorType) => {
  autoComplete(editor, props.customGetCompletionItems, designInstance.getSchema())
  emits('init', editor)
}

const onModeChange = (newMode: string, editor: JsonEditorType) => {
  if (newMode === 'code') {
    autoComplete(editor, props.customGetCompletionItems, designInstance.getSchema())
  }
}

const handleSave = () => {
  emits('save', cloneDeep(data.value))
}

const handleReset = () => {
  data.value = cloneDeep(props.json)
}

onMounted(() => {
  handleReset()
})
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
