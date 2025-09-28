<template>
  <div :class="ns('form-design-center-actions')">
    <div class="left">
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

    <div class="right">
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
    <Preview v-model="PreviewVisible" :schema-context="designInstance.schemaContext" />
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@/components'
import { useDesignInstance, useLocale } from '@/hooks'
import { ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import { ns } from '@/tools'
import JsonSchema from './JsonSchema.vue'
import Preview from './Preview.vue'

type PreviewAction = {
  label: string
  btnType: 'default' | 'primary' | 'text' | 'success' | 'warning' | 'info' | 'danger'
  icon?: string
  onClick: () => void
}

const designInstance = useDesignInstance()

const locale = useLocale()

const JsonSchemaVisible = ref(false)
const PreviewVisible = ref(false)

const leftActions: PreviewAction[] = [
  {
    label: locale.value.actions.previewJson,
    btnType: 'primary',
    icon: 'script',
    onClick: () => {
      JsonSchemaVisible.value = true
    }
  }
]

const rightActions: PreviewAction[] = [
  {
    label: locale.value.actions.save,
    icon: 'save',
    btnType: 'primary',
    onClick: () => {
      designInstance.handleEmit('save')
    }
  },
  {
    label: locale.value.actions.previewForm,
    btnType: 'default',
    icon: 'eye',
    onClick: () => {
      PreviewVisible.value = true
    }
  },
  {
    label: locale.value.actions.clear,
    btnType: 'danger',
    icon: 'trash',
    onClick: async () => {
      await ElMessageBox.confirm('确认清空当前设计吗？')
      designInstance.updateSchema({
        labelWidth: 150,
        labelAlign: 'right',
        scrollToError: true,
        size: 'default',
        submitBtn: true,
        items: []
      })
    }
  }
]
</script>
