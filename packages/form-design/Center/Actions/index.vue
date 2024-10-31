<template>
  <div :class="ns('actions')">
    <div :class="ns('actions-left')">
      <el-button
        v-for="{ label, btnType, icon, onClick } in leftActions"
        :key="label"
        :type="btnType"
        size="small"
        @click="onClick"
      >
        <template #icon v-if="icon">
          <Icon :name="icon" />
        </template>
        {{ label }}</el-button
      >
    </div>

    <div :class="ns('actions-right')">
      <el-button
        v-for="{ label, btnType, icon, onClick } in rightActions"
        :key="label"
        :type="btnType"
        size="small"
        @click="onClick"
      >
        <template #icon v-if="icon"> <Icon :name="icon" /> </template>{{ label }}</el-button
      >
    </div>

    <JsonSchema v-model="JsonSchemaVisible" />
    <VueCode v-model="VueCodeVisible" />
    <Preview v-model="PreviewVisible" :schema-context="designInstance.schemaContext" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import Icon from '@vue-form-craft/icons'
import JsonSchema from './JsonSchema.vue'
import VueCode from './VueCode.vue'
import Preview from './Preview.vue'
import { useDesignInstance, useLocale } from '@vue-form-craft/hooks'
import { ns } from '@vue-form-craft/utils'

type PreviewAction = {
  label: string
  btnType: 'default' | 'primary' | 'text' | 'success' | 'warning' | 'info' | 'danger'
  icon?: string
  onClick: () => void
}

const designInstance = useDesignInstance()

const locale = useLocale()

const JsonSchemaVisible = ref(false)
const VueCodeVisible = ref(false)
const PreviewVisible = ref(false)

const leftActions: PreviewAction[] = [
  {
    label: locale.value.actions.previewJson,
    btnType: 'primary',
    icon: 'script',
    onClick: () => {
      JsonSchemaVisible.value = true
    }
  },
  {
    label: locale.value.actions.previewVueCode,
    btnType: 'default',
    icon: 'vue',
    onClick: () => {
      VueCodeVisible.value = true
    }
  },
  {
    label: locale.value.actions.previewForm,
    btnType: 'default',
    icon: 'eye',
    onClick: () => {
      PreviewVisible.value = true
    }
  }
]

const rightActions: PreviewAction[] = [
  {
    label: locale.value.actions.clear,
    btnType: 'danger',
    icon: 'trash',
    onClick: async () => {
      await ElMessageBox.confirm('确认清空当前设计吗？')
      designInstance.updateSchema({ ...designInstance.schema, items: [] })
    }
  },
  {
    label: locale.value.actions.save,
    icon: 'save',
    btnType: 'primary',
    onClick: designInstance.handleSave
  }
]
</script>