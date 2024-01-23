<template>
  <schema-form v-model="formValues" :schema="schema" ref="formRef" />
  <button @click="handleSubmit">提交</button>
</template>

<script setup>
import { ref } from 'vue'

const formRef = ref()

const formValues = ref({})

const handleSubmit = () => {
  formRef.value
    .submit()
    .then((values) => {
      alert(JSON.stringify(values))
    })
    .catch((e) => console.log(e))
}

const schema = {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '单行文本',
      component: 'input',
      props: {},
      onlyId: 'form-CcbS',
      name: 'GPbY7B'
    },
    {
      label: '单选框组',
      component: 'radio',
      props: {
        mode: 'static',
        options: [
          {
            label: '选项1',
            value: 'value1'
          },
          {
            label: '选项2',
            value: 'value2'
          },
          {
            label: '选项3',
            value: 'value3'
          }
        ]
      },
      onlyId: 'form-JbJr',
      name: 'gAeCer'
    },
    {
      label: '多选框组',
      component: 'checkbox',
      props: {
        mode: 'static',
        options: [
          {
            label: '选项1',
            value: 'value1'
          },
          {
            label: '选项2',
            value: 'value2'
          },
          {
            label: '选项3',
            value: 'value3'
          }
        ]
      },
      onlyId: 'form-qaIU',
      name: '4Kpplx'
    },
    {
      label: '多行文本',
      component: 'textarea',
      props: {
        autosize: {
          minRows: 4,
          maxRows: 999
        }
      },
      onlyId: 'form-LmKV',
      name: 'P5WBvj'
    },
    {
      label: '下拉选择框',
      component: 'select',
      props: {
        mode: 'static',
        options: [
          {
            label: '选项1',
            value: 'value1'
          },
          {
            label: '选项2',
            value: 'value2'
          },
          {
            label: '选项3',
            value: 'value3'
          }
        ]
      },
      onlyId: 'form-bsxr',
      name: 'MpU6Sf'
    }
  ]
}
</script>
