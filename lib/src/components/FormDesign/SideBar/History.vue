<template>
  <div :class="ns('history-list')">
    <div v-if="history.length === 0" class="empty-tip">暂无历史记录</div>
    <div
      v-for="(record, index) in history"
      :key="index"
      :class="['history-item', { active: index === historyIndex }]"
      @click="handleJumpTo(index)"
    >
      <div class="description">{{ record.description }}</div>
      <div class="timestamp">{{ formatTime(record.timestamp) }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash'
import { computed } from 'vue'
import { useDesignInstance } from '@/hooks'
import { ns } from '@/utils'

const designInstance = useDesignInstance()!

// 使用 computed 包装 getter 方法，保持响应式
const history = computed(() => designInstance.getHistory())
const historyIndex = computed(() => designInstance.getHistoryIndex())

// 格式化时间
const formatTime = (timestamp: number) => {
  const date = new Date(timestamp)
  const year = date.getFullYear().toString().slice(2)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
}

// 跳转到指定历史记录
const handleJumpTo = (index: number) => {
  if (index === historyIndex.value) return

  designInstance.setHistoryIndex(index)
  const record = history.value[index]
  if (record) {
    designInstance.setSchema(cloneDeep(record.schema))
  }
}
</script>

<style lang="scss">
@import '@/style';

@include ns('history-list') {
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;

  .empty-tip {
    text-align: center;
    color: $textColor3;
    font-size: 14px;
    padding: 20px;
  }

  .history-item {
    padding: 12px;
    margin-bottom: 8px;
    background-color: $bgColor2;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid transparent;

    &:hover {
      background-color: $bgColor3;
    }

    &.active {
      border-color: $themeColor;
      background-color: rgba($themeColor, 0.1);
    }

    .description {
      font-size: 14px;
      color: $textColor1;
      margin-bottom: 4px;
      font-weight: 500;
    }

    .timestamp {
      font-size: 12px;
      color: $textColor3;
    }
  }
}
</style>
