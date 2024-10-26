<template>
  <div :class="ns('style-config')">
    <el-divider>组件样式</el-divider>
    <FormRender v-model="currentProps" :schema="schemaMini" ref="formRef" />
    <el-button type="primary" plain size="small" @click="visible = true">自定义更多样式</el-button>

    <el-drawer v-model="visible" title="组件样式">
      <FormRender v-model="currentProps" :schema="schema" ref="formRef" />
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormSchema } from '@vue-form-craft/release'
import FormRender from '@vue-form-craft/components/FormRender.vue'
import { ns } from '@vue-form-craft/utils';

const currentProps = defineModel<Record<string, any>>()

const visible = ref(false)

const schemaMini: FormSchema = {
  labelWidth: 60,
  labelAlign: 'right',
  size: 'small',
  items: [
    {
      label: 'class',
      component: 'Input',
      props: {
        placeholder: ''
      },
      designKey: 'design-KUlI',
      name: 'class'
    },
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
      name: 'style.width'
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
            label: 'vh',
            value: 'vh'
          },
          {
            label: 'rem',
            value: 'rem'
          }
        ],
        clearable: true
      },
      designKey: 'design-Bvi44',
      name: 'style.height'
    }
  ]
}

const schema: FormSchema = {
  labelWidth: 60,
  labelAlign: 'right',
  size: 'small',
  items: [
    {
      label: 'ID',
      component: 'Input',
      props: {
        placeholder: ''
      },
      designKey: 'form-0vQJ',
      name: 'id'
    },
    {
      label: 'class',
      component: 'Input',
      props: {
        placeholder: ''
      },
      designKey: 'design-KUlI',
      name: 'class'
    },
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
      name: 'style.width'
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
            label: 'vh',
            value: 'vh'
          },
          {
            label: 'rem',
            value: 'rem'
          }
        ],
        clearable: true
      },
      designKey: 'design-Bvi44',
      name: 'style.height'
    },
    {
      label: '背景色',
      component: 'ColorInput',
      designKey: 'form-YicU',
      name: 'style.backgroundColor'
    },
    {
      label: '文字颜色',
      component: 'ColorInput',
      designKey: 'design-A2bj',
      name: 'style.color'
    },
    {
      label: '自定义',
      component: 'JsonEdit',
      designKey: 'design-A2bj',
      name: 'style'
    }
  ]
}
</script>