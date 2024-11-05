<template>
  <div :class="ns('linkageConfig')">
    <el-divider>{{ locale.attr.tab1.linkage.text }}</el-divider>

    <div :class="ns('linkageConfig-btns')">
      <el-button
        v-for="{ title, onClick } in linkageBtns"
        :key="title"
        type="primary"
        plain
        size="small"
        @click="onClick"
        >{{ title }}</el-button
      >
    </div>

    <el-dialog destroy-on-close v-model="visible" top="3vh" :title="title">
      <JsonEditor
        v-if="type === 'config'"
        v-model="model"
      />
      <FormRender v-if="type === 'value'" v-model="model" :schema="linkageSchema(designInstance.schema, model!)" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormRender from '../../../form-render'
import linkageSchema from '../linkageSchema'
import type { FormItemType } from '@vue-form-craft/types'
import { useDesignInstance, useElements, useLocale } from '@vue-form-craft/hooks'
import { ns } from '@vue-form-craft/utils'

const model = defineModel<FormItemType>()

const locale = useLocale()

const elements = useElements()

const JsonEditor = elements.JsonEdit.component

const designInstance = useDesignInstance()

const visible = ref(false)

const type = ref('config')

const title = ref('')

const linkageBtns = [
  {
    title: locale.value.attr.tab1.linkage.action1,
    onClick: () => {
      visible.value = true
      type.value = 'config'
      title.value = '配置项联动'
    }
  },
  {
    title: locale.value.attr.tab1.linkage.action2,
    onClick: () => {
      visible.value = true
      type.value = 'value'
      title.value = '值联动'
    }
  }
]
</script>
