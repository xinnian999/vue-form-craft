<template>
  <FormDesign
    v-model="schema"
    class="docs-form-design"
    style="height:100vh"
    @save="onSave"
    @add="onAdd"
  />
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
import type { FormElement, FormSchema } from '@form-magic/element-plus'

const schema = ref<FormSchema>({
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  scrollToError: true,
  items: []
})

const onSave = () => {
  localStorage.setItem('schema', JSON.stringify(schema.value))
  ElMessage.success('保存成功')
}

const onAdd = (element: FormElement) => {
  console.log('onAdd===>', element)
}

onMounted(() => {
  const localSchema = localStorage.getItem('schema')
  if (localSchema) {
    schema.value = JSON.parse(localSchema)
  }
})
</script>
