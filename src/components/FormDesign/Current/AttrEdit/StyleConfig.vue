<template>
  <div style="text-align: center">
    <el-divider>组件样式</el-divider>
    <FormRender v-model="style" :schema="schema" ref="formRef" />
    <el-button type="primary" plain size="small">自定义更多样式</el-button>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { $current } from '@/config/symbol'
import { setDataByPath } from '@/utils'
import type { FormItemType, FormSchema } from '@/release'
import FormRender from '@/components/FormRender.vue'

const { current, updateCurrent } = inject($current)!

const schema: FormSchema = {
  labelWidth: 60,
  labelAlign: 'right',
  size: 'small',
  items: [
    {
      label: '宽度',
      component: 'SelectInput',
      props: {
        selectPosition: 'append',
        selectWidth: 50,
        selectInitialValue: '%',
        placeholder: '100',
        options: [
          {
            label: '%',
            value: '%'
          },
          {
            label: 'px',
            value: 'px'
          },
          {
            label: 'vw',
            value: 'vw'
          },
          {
            label: 'rem',
            value: 'rem'
          }
        ],
        clearable: true
      },
      designKey: 'design-Bvi4',
      name: 'width'
    },
    {
      label: '高度',
      component: 'SelectInput',
      props: {
        selectPosition: 'append',
        selectWidth: 50,
        selectInitialValue: 'px',
        placeholder: 'auto',
        options: [
          {
            label: '%',
            value: '%'
          },
          {
            label: 'px',
            value: 'px'
          },
          {
            label: 'vw',
            value: 'vw'
          },
          {
            label: 'rem',
            value: 'rem'
          }
        ],
        clearable: true
      },
      designKey: 'design-Bvi44',
      name: 'height'
    }
  ]
}

const style = computed({
  get() {
    return current.value?.props?.style || {}
  },
  set(value) {
    const newValues = setDataByPath(current.value!, 'props.style', value) as FormItemType
    updateCurrent(newValues)
  }
})
</script>
