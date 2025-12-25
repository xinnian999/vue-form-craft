<template>
  <span v-if="read">{{ value }}</span>
  <Input v-else v-bind="$attrs" v-model="value">
    <template #suffix>
      <slot name="suffix">
        <Icon
          v-if="aiPrompt && isAvailable"
          name="magic"
          :class="[ns('input-ai-icon'), { 'is-loading': aiLoading }]"
          @click="handleAiClick"
        />
      </slot>
    </template>
  </Input>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@/components'
import { useAi, useFormInstance, useUI } from '@/hooks'
import { ns } from '@/utils'

const { Input } = useUI()

const value = defineModel<string>()

const formInstance = useFormInstance()

// 使用 computed 包装 getter 方法，保持响应式
const read = computed(() => formInstance?.getRead() ?? false)

const props = defineProps<{
  aiPrompt?: string
}>()

const { isAvailable, request, cancel } = useAi()

const aiLoading = ref(false)

const handleAiClick = async () => {
  if (!props.aiPrompt || !isAvailable) return

  // 正在生成时再次点击，视为取消
  if (aiLoading.value) {
    cancel()
    aiLoading.value = false
    return
  }

  aiLoading.value = true

  const result = await request(props.aiPrompt)

  if (result) {
    value.value = typeof result === 'string' ? result : JSON.stringify(result)
  }

  aiLoading.value = false
}
</script>

<style scoped lang="scss">
@import '@/style.scss';

@include ns('input-ai-icon') {
  font-size: 14px;
  cursor: pointer;
  color: $textColorSecondary;
  transition:
    color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    color: $themeColor;
    transform: scale(1.05);
  }

  &.is-loading {
    animation: vfc-input-ai-rotate 1s linear infinite;
  }
}

@keyframes vfc-input-ai-rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
