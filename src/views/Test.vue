<template>
  <schema-form :schema="schema" ref="formRef" />
  <ElButton @click="handleSubmit" type="primary" style="margin-left: 150px">提交</ElButton>
</template>

<script setup>
import { ref } from 'vue'
import { ElButton } from 'element-plus'

const formRef = ref()

const handleSubmit = () => {
  formRef.value
    .submit()
    .then((values) => {
      alert(JSON.stringify(values))
    })
    .catch(() => console.log('表单校验不通过'))
}

const schema = {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '评分',
      component: 'Rate',
      props: {
        max: 5,
        'allow-half': true
      },
      designKey: 'form-Lx4g',
      name: 'rate',
      style: {},
      required: true
    },
    {
      label: '差评原因',
      component: 'Textarea',
      props: {
        autocomplete: 'off',
        showWordLimit: true,
        type: 'textarea',
        autosize: {
          minRows: 4,
          maxRows: 999
        },
        placeholder: '请输入...'
      },
      designKey: 'form-XyJs',
      name: 'reason',
      style: {},
      hidden: '{{!$values.rate||$values.rate>3}}'
    }
  ]
}
</script>
