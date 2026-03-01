<template>
  <div style="max-width: 620px; margin: 20px auto">
    <FormRender v-model="formValues" :schema="schema" @finish="onFinish" />

    <div style="margin-top: 30px">
      <div style="font-weight: 600; margin-bottom: 6px">实时表单数据（深层结构）</div>
      <pre
        style="background: #eee; color: #000; padding: 12px; border-radius: 8px; overflow: auto"
        >{{ prettyJSON }}</pre
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { FormSchema } from 'vue-form-craft'

const formValues = ref<any>({
  id: 1001,
  info: {
    basic: {
      name: '吴彦祖',
      desc: '中国最帅的男人',
      age: 42
    },
    tag: ['a', 'b']
  }
})

const schema: FormSchema = {
  labelWidth: 100,
  labelAlign: 'right',
  size: 'default',
  submitBtn: true,
  resetBtn: true,
  items: [
    {
      label: 'ID',
      name: 'id',
      component: 'InputNumber',
      required: true,
      componentProps: {
        min: 1
      }
    },
    {
      label: '姓名',
      name: 'info.basic.name',
      component: 'Input',
      required: true,
      componentProps: {
        placeholder: '请输入姓名'
      }
    },
    {
      label: '简介',
      name: 'info.basic.desc',
      component: 'TextArea',
      componentProps: {
        rows: 2,
        placeholder: '请输入简介'
      }
    },
    {
      label: '年龄',
      name: 'info.basic.age',
      component: 'InputNumber',
      componentProps: {
        min: 0,
        max: 120
      }
    },
    {
      label: '标签',
      name: 'info.tag',
      component: 'Checkbox',
      componentProps: {
        options: [
          { label: '标签 A', value: 'a' },
          { label: '标签 B', value: 'b' },
          { label: '标签 C', value: 'c' }
        ]
      }
    }
  ]
}

const prettyJSON = computed(() => JSON.stringify(formValues.value, null, 2))

const onFinish = (values: Record<string, any>) => {
  alert(JSON.stringify(values, null, 2))
}
</script>
