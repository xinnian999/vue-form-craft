<template>
  <div :class="ns('form-design-header')">
    <div class="left">
      <Button
        :disabled="designInstance.historyIndex === -1"
        name="history-back"
        :size="btnSize"
        @click="designInstance.handleHistoryBack"
      >
        <template #icon><Icon name="back" /></template>
      </Button>
      <Button
        name="history-forward"
        :disabled="
          designInstance.historyIndex === designInstance.history.length - 1 ||
          designInstance.history.length === 0
        "
        :size="btnSize"
        @click="designInstance.handleHistoryForward"
      >
        <template #icon><Icon name="forward" /></template>
      </Button>
      <Button :size="btnSize" @click="designInstance.handleToggleFullScreen">
        <template #icon>
          <Icon :name="designInstance.fullScreen ? 'cancelFullScreen' : 'fullScreen'" />
        </template>
      </Button>
    </div>

    <div class="right">
      <Button
        v-for="{ label, btnType, icon, name, onClick } in rightActions"
        :key="label"
        :type="btnType"
        :name="name"
        :size="btnSize"
        @click="onClick"
      >
        <template #icon v-if="icon"> <Icon :name="icon" /> </template>{{ label }}</Button
      >
    </div>
    <Json v-model="JsonVisible" />
    <Preview v-model="PreviewVisible" />
  </div>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import { Icon } from '@/components'
import { useDesignInstance, useUI } from '@/hooks'
import { ns } from '@/utils'
import Json from './Json/index.vue'
import Preview from './Preview.vue'

const { Button } = useUI()

type PreviewAction = {
  label: string
  btnType: 'default' | 'primary' | 'text' | 'success' | 'warning' | 'info' | 'danger'
  icon?: string
  name?: string
  onClick: () => void
}

const designInstance = useDesignInstance()!

const JsonVisible = ref(false)

const PreviewVisible = ref(false)

const btnSize = 'small'

const rightActions: PreviewAction[] = [
  {
    label: '预览',
    btnType: 'default',
    name: 'preview-design',
    icon: 'eye',
    onClick: () => {
      designInstance.repirSchema()
      PreviewVisible.value = true
    }
  },
  {
    label: 'JSON',
    btnType: 'primary',
    icon: 'script',
    onClick: () => {
      JsonVisible.value = true
    }
  },
  {
    label: '清空',
    btnType: 'danger',
    icon: 'trash',
    name: 'clear-design',
    onClick: async () => {
      await ElMessageBox.confirm('确认清空当前设计吗？')
      designInstance.handleClear()
    }
  },
  {
    label: '保存',
    icon: 'save',
    btnType: 'primary',
    onClick: () => {
      designInstance.handleEmit('save')
    }
  }
]
</script>

<style lang="scss">
@import '@/style';

@include ns('form-design-header') {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background-color: #fff;
  padding: 10px 15px;
  border-bottom: 1px solid #eee;
  gap: 12px;

  .logo {
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 5px;
    width: 350px;
  }

  .left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .right {
    margin-left: auto;
    display: flex;
    gap: 12px;
  }
}
</style>
