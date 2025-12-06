<template>
  <div v-if="formInstance.read">
    {{ value?.map((item) => currentOptions.find((v) => v.value === item)?.label).join('、') }}
  </div>
  <template v-else>
    <div v-if="!currentOptions.length && !loading" style="font-size: 12px">暂无选项</div>

    <CheckboxGroup
      v-bind="$attrs"
      v-model="value"
      @change="selectChange"
      v-loading="loading"
      :isButtonOption="isButtonOption"
      :options="currentOptions"
    />
  </template>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useFormInstance, useSelect, useUI } from '@/hooks'
import type { SelectProps } from '@/types'

const { CheckboxGroup } = useUI()

type Props = Omit<SelectProps, 'multiple'> & {
  isButtonOption?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  mode: 'static',
  name: '',
  multiple: true
})

const value = defineModel<any[]>({ default: () => [] })

const formInstance = useFormInstance()

const { currentOptions, selectChange, loading } = useSelect(props)

watch(value, selectChange)
</script>
