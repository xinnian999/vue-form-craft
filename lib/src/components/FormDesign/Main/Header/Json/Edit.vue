<template>
  <div :class="ns('save-json-edit')">
    <VueMonacoEditor
      v-model:value="jsonString"
      language="json"
      :options="editorOptions"
      :style="{ height: '400px' }"
    />
    <div class="footer">
      <Button @click="handleSave" type="primary">保存更改</Button>
      <Button @click="handleReset">重置</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'
import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash'
import { onMounted, ref } from 'vue'
import { useUI } from '@/hooks'
import type { FormSchema } from '@/types'
import { ns } from '@/utils'

const { Button } = useUI()

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
    ElMessage.success('保存成功')
  } catch (error) {
    ElMessage.error('JSON格式错误，请检查后重试')
  }
}

const handleReset = () => {
  jsonString.value = JSON.stringify(props.json, null, 2)
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
