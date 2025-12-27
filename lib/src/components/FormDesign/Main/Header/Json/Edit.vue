<template>
  <div :class="ns('save-json-edit')">
    <VueMonacoEditor
      v-model:value="jsonString"
      language="json"
      :options="editorOptions"
      :style="{ height: '500px' }"
    />
    <div class="footer">
      <Button @click="handleClear">清空</Button>
      <Button @click="handleReset">重置</Button>
      <Button @click="handleSave" type="primary">保存</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'
import { cloneDeep } from 'lodash'
import { onMounted, ref } from 'vue'
import { useUI } from '@/hooks'
import type { FormSchema } from '@/types'
import { ns, removeDesignKeys } from '@/utils'

const { Button, Message } = useUI()

const props = defineProps<{
  json: FormSchema
}>()

const emits = defineEmits<{
  save: [json: FormSchema]
}>()

const jsonString = ref('')

const editorOptions = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
  minimap: {
    enabled: false
  },
  scrollBeyondLastLine: false,
  fontSize: 14,
  tabSize: 2
}

const handleSave = () => {
  try {
    const parsedJson = JSON.parse(jsonString.value)
    emits('save', cloneDeep(parsedJson))
    Message.success('保存成功')
  } catch (error) {
    Message.error('JSON格式错误，请检查后重试')
  }
}

const handleReset = () => {
  // 移除 designKey 后再显示，因为 designKey 是设计器内部使用的，用户无需关心
  const jsonWithoutDesignKey = removeDesignKeys(cloneDeep(props.json))
  jsonString.value = JSON.stringify(jsonWithoutDesignKey, null, 2)
}

const handleClear = () => {
  jsonString.value = ''
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
  gap: 15px;

  .footer {
    display: flex;
    gap: 10px;
    padding: 0 10px;
    justify-content: right;
  }
}
</style>
