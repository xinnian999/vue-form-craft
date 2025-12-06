<template>
  <div v-if="formInstance.read">
    {{ currentOptions.find((item) => item.value === value)?.label }}
  </div>
  <template v-else>
    <div v-if="!currentOptions.length && !loading" style="font-size: 12px">暂无选项</div>
    <RadioGroup
      v-else
      v-model="value"
      @change="selectChange"
      v-loading="loading"
      v-bind="$attrs"
      :options="currentOptions"
      :isButtonOption="isButtonOption"
    />
  </template>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useFormInstance, useSelect, useUI } from '@/hooks'
import type { ComponentBaseProps, SelectProps, SelectValue } from '@/types'

const { RadioGroup } = useUI()

type Props = Omit<SelectProps, 'multiple'> &
  ComponentBaseProps & {
    isButtonOption?: boolean
  }

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  mode: 'static',
  name: ''
})

const value = defineModel<SelectValue>({ default: '' })

const formInstance = useFormInstance()

const { currentOptions, selectChange, loading } = useSelect(props)

watch(value, selectChange)
</script>
