<template>
  <FormDesign
    v-model="schema"
    class="docs-form-design"
    style="height: calc(100vh - 65px)"
    @save="onSave"
    @add="onAdd"
  />
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
import type { FormElement, FormSchema } from 'vue-form-craft'

const schema = ref<FormSchema>({
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
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

<style>
.docs-form-design {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    line-height: auto;
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
