<template>
  <FormRender v-model="formValues" :schema="schema" ref="formRef" />
  <el-button @click="handleSubmit" style="margin-left: 150px;">提交</el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormSchema, FormInstance } from 'vue-form-craft'

const formRef = ref<FormInstance>()

const formValues = ref({})

const schema: FormSchema = {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '姓名',
      component: 'Input',
      props: {
        placeholder: '请输入姓名'
      },
      designKey: 'design-Oqsp',
      name: 'name',
      required: true
    },
    {
      label: '性别',
      component: 'Radio',
      props: {
        mode: 'static',
        options: [
          {
            label: '男',
            value: 'man'
          },
          {
            label: '女',
            value: 'women'
          }
        ],
        labelKey: 'label',
        valueKey: 'value',
        optionType: 'circle',
        direction: 'horizontal',
        space: 20
      },
      designKey: 'design-47M1',
      name: 'gneder',
      required: true,
      initialValue: 'man',
      change: [
        {
          target: 'isHy'
        },
        {
          target: 'hyWeek'
        }
      ]
    },
    {
      label: '是否怀孕',
      component: 'Switch',
      props: {
        'inline-prompt': false
      },
      designKey: 'design-cGIx',
      name: 'isHy',
      required: true,
      hidden: " {{ $values.gneder === 'man' }} "
    },
    {
      label: '怀孕周期',
      component: 'InputNumber',
      props: {
        min: 1,
        max: 999,
        step: 1,
        controlsPosition: 'right'
      },
      designKey: 'design-0q9f',
      name: 'hyWeek',
      hidden: '{{ !$values.isHy }}'
    }
  ]
}

const handleSubmit = async () => {
  await formRef.value?.validate()
  alert(JSON.stringify(formValues.value, null, 2))
}
</script>
