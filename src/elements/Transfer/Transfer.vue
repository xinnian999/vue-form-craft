<template>
  <Disabled :disabled="disabled">
    <ElTransfer
      v-bind="$attrs"
      v-model="selectVal"
      :data="currentOptions"
      :props="{ label: props.labelKey, key: props.valueKey }"
  /></Disabled>
</template>

<script setup>
import { ElTransfer } from 'element-plus'
import { defineProps, defineEmits, watchEffect, computed, ref, onMounted } from 'vue'
import useSelect from '@/hooks/useSelect'
import { Disabled } from '@/components'

const props = defineProps({
  modelValue: {},
  options: {
    type: Array,
    default: () => []
  },
  mode: {
    type: String,
    default: 'static'
  },
  labelKey: {
    type: String,
    default: 'label'
  },
  valueKey: {
    type: String,
    default: 'value'
  },
  api: Object,
  disabled: Boolean,
  dataPath: String
})

const emits = defineEmits(['update:modelValue', 'onChangeSelect'])

const { selectVal, currentOptions, selectChange, loading } = useSelect(props, emits)

// watchEffect(() => {
//   console.log(currentOptions.value)
// })
</script>
