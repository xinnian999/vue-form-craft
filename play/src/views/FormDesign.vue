<template>
  <FormDesign
    v-model="schema"
    class="docs-form-design"
    style="height: 100vh"
    @save="onSave"
    @add="onAdd"
  />
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import type { FormElement, FormSchema } from 'form-craft'
import { onMounted, ref } from 'vue'

const schema = ref<FormSchema>({
  labelWidth: 150,
  labelAlign: 'right',
  scrollToError: true,
  size: 'default',
  submitBtn: true,
  items: [
    {
      label: '单行文本4444',
      props: {
        placeholder: '请输入文本',
        style: {
          transform: 'scale(NaN)'
        }
      },
      component: 'Input',
      name: 'input86026434',
      required: false
    },
    {
      label: '多行文本',
      props: {
        placeholder: '请输入...',
        autosize: {
          minRows: 4,
          maxRows: 999
        }
      },
      component: 'TextArea',
      name: 'textarea62305061'
    }
  ]
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
    schema.value = JSON.parse(localSchema)
  }
})
</script>
