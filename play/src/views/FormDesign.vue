<template>
  <FormDesign
    v-model="schema"
    class="docs-form-design"
    style="height: 100vh"
    @save="onSave"
    @add="onAdd"
    ref="formDesignRef"
  />
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import type { FormElement, FormSchema } from 'form-craft'
import { onMounted, ref } from 'vue'

const formDesignRef = ref()

const schema = ref<FormSchema>({
  labelWidth: 150,
  labelAlign: 'right',
  scrollToError: true,
  size: 'default',
  submitBtn: true,
  items: []
})

const onSave = () => {
  localStorage.setItem('schema', JSON.stringify(schema.value))
  ElMessage.success('保存成功')
}

const onAdd = (element: FormElement) => {
  // console.log('onAdd===>', element)
}

onMounted(() => {
  const localSchema = localStorage.getItem('schema')
  if (localSchema) {
    formDesignRef.value?.setSchema(JSON.parse(localSchema))
  }
})
</script>
