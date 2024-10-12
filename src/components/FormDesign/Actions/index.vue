<template>
  <div class="vfc-formDesign-actions">
    <div class="vfc-formDesign-actions-left">
      <el-button
        v-for="{ label, btnType, icon, onClick } in leftActions"
        :key="label"
        :type="btnType"
        size="small"
        @click="onClick"
      >
        <template #icon v-if="icon">
          <icon-render :name="icon" />
        </template>
        {{ label }}</el-button
      >
    </div>

    <div class="vfc-formDesign-actions-right">
      <el-button
        v-for="{ label, btnType, icon, onClick } in rightActions"
        :key="label"
        :type="btnType"
        size="small"
        @click="onClick"
      >
        <template #icon v-if="icon"> <icon-render :name="icon" /> </template>{{ label }}</el-button
      >
    </div>

    <JsonSchema v-model="JsonSchemaVisible" />
    <VueCode v-model="VueCodeVisible" />
    <Preview v-model="PreviewVisible" :schema-context="schemaContext" />
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { ElMessageBox } from 'element-plus'
import { $schema, $methods } from '@vue-form-craft/config/symbol'
import IconRender from '@vue-form-craft/components/IconRender.vue'
import JsonSchema from './JsonSchema.vue'
import VueCode from './VueCode.vue'
import Preview from './Preview.vue'
import { useLocale } from '@vue-form-craft/hooks'

type PreviewAction = {
  label: string
  btnType: 'default' | 'primary' | 'text' | 'success' | 'warning' | 'info' | 'danger'
  icon?: string
  onClick: () => void
}

defineProps<{
  schemaContext: Record<string, any>
}>()

const { schema } = inject($schema)!

const { handleSave } = inject($methods)!

const locale = useLocale()

const JsonSchemaVisible = ref(false)
const VueCodeVisible = ref(false)
const PreviewVisible = ref(false)

const leftActions: PreviewAction[] = [
  {
    label: locale.value.actions.previewJson,
    btnType: 'primary',
    icon:'script',
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
    icon:'eye',
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
      schema.value = { ...schema.value, items: [] }
    }
  },
  {
    label: locale.value.actions.save,
    icon:'save',
    btnType: 'primary',
    onClick: handleSave
  }
]
</script>

<style scoped lang="less">
.vfc-formDesign-actions {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .vfc-formDesign-actions-left,
  .vfc-formDesign-actions-right {
    button {
      margin-bottom: 10px;
    }
  }
}
</style>
