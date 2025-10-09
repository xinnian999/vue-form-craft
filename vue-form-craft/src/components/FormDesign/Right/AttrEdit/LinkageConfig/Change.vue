<template>
  <el-dialog destroy-on-close v-model="visible" top="3vh" title="数据联动">
    <FormRender v-model="designInstance.current!" :schema="schema" />
  </el-dialog>
</template>

<script setup lang="ts">
import { FormRender } from '@/components'
import { useDesignInstance } from '@/hooks'
import type { FormSchema } from '@/types'

const designInstance = useDesignInstance()

const visible = defineModel<boolean>()

const schema: FormSchema = {
  labelWidth: 100,
  labelAlign: 'top',
  items: [
    {
      hideLabel: true,
      name: 'change',
      component: 'FormList',
      children: [
        {
          label: '目标字段',
          name: 'target',
          component: 'Input',
          required: true,
          help: '目标字段的name'
        },
        {
          label: '触发条件',
          name: 'condition',
          component: 'Input',
          help: '可选<br/>如果不设置，默认会一直触发联动。 <br/>如果设置，输入一个JS表达式，当表达式结果为true时才触发联动。'
        },
        {
          label: '新数据',
          name: 'value',
          component: 'Input',
          help: '可选<br/>如果不填，则直接清空目标字段的数据'
        }
      ],
      props: {
        mode: 'card',
        title: '数据联动'
      }
    }
  ]
}
</script>
