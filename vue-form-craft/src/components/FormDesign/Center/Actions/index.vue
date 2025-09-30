<template>
  <div :class="ns('form-design-center-actions')">
    <div class="left">
      <el-button-group size="small">
        <el-button
          type="primary"
          :disabled="designInstance.historyIndex === 0"
          @click="designInstance.handleHistoryBack"
        >
          <template #icon><Icon name="back" /></template>
        </el-button>
        <el-button
          type="primary"
          :disabled="
            designInstance.historyIndex === designInstance.history.length - 1 ||
            designInstance.history.length === 0
          "
          @click="designInstance.handleHistoryForward"
        >
          <template #icon><Icon name="forward" /></template>
        </el-button>
      </el-button-group>
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
import { ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import { useDesignInstance, useLocale } from '@/hooks'
import Icon from '@/Icon/index.vue'
import { ns } from '@/utils'
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

const rightActions: PreviewAction[] = [
  {
    label: locale.value.actions.previewJson,
    btnType: 'primary',
    icon: 'script',
    onClick: () => {
      JsonSchemaVisible.value = true
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
    label: locale.value.actions.save,
    icon: 'save',
    btnType: 'primary',
    onClick: () => {
      designInstance.handleEmit('save')
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
