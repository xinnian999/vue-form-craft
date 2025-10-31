<template>
  <div :class="ns('form-design-header')">
    <div class="left">
      <el-button-group size="small">
        <el-button
          type="primary"
          :disabled="designInstance.historyIndex === -1"
          name="history-back"
          @click="designInstance.handleHistoryBack"
        >
          <template #icon><Icon name="back" /></template>
        </el-button>
        <el-button
          type="primary"
          name="history-forward"
          :disabled="
            designInstance.historyIndex === designInstance.history.length - 1 ||
            designInstance.history.length === 0
          "
          @click="designInstance.handleHistoryForward"
        >
          <template #icon><Icon name="forward" /></template>
        </el-button>
      </el-button-group>
      <el-button
        @click="designInstance.handleToggleFullScreen"
        size="small"
        style="margin-left: 12px"
      >
        <template #icon>
          <Icon :name="designInstance.fullScreen ? 'cancelFullScreen' : 'fullScreen'" />
        </template>
      </el-button>
    </div>

    <div class="right">
      <el-button
        v-for="{ label, btnType, icon, name, onClick } in rightActions"
        :key="label"
        :type="btnType"
        :name="name"
        size="small"
        @click="onClick"
      >
        <template #icon v-if="icon"> <Icon :name="icon" /> </template>{{ label }}</el-button
      >
    </div>

    <Preview v-model="PreviewVisible" :schema-context="designInstance.schemaContext" />
  </div>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import { useDesignInstance, useLocale } from '@/hooks'
import Icon from '@/Icon/index.vue'
import { ns } from '@/utils'
import Preview from './Preview.vue'

type PreviewAction = {
  label: string
  btnType: 'default' | 'primary' | 'text' | 'success' | 'warning' | 'info' | 'danger'
  icon?: string
  name?: string
  onClick: () => void
}

const designInstance = useDesignInstance()!

const locale = useLocale()

const PreviewVisible = ref(false)

const rightActions: PreviewAction[] = [
  {
    label: locale.value.actions.previewJson,
    btnType: 'primary',
    icon: 'script',
    onClick: () => {
      designInstance.handleJson()
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
    name: 'clear-design',
    onClick: async () => {
      await ElMessageBox.confirm('确认清空当前设计吗？')
      designInstance.handleClear()
    }
  }
]
</script>

<style lang="scss">
@import '@/style';

@include ns('form-design-header') {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  background-color: #fff;
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>
