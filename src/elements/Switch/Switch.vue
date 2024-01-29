<template>
  <ElSwitch v-model="value" v-bind="$attrs" />
</template>

<script setup lang="jsx">
import { defineProps, computed, onMounted, ref, watch } from 'vue'
import { ElSwitch } from 'element-plus'

const props = defineProps({
  modelValue: Boolean
})

const emits = defineEmits(['update:modelValue'])

// const value = ref(false)

const value = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  }
})

// onMounted(() => {
//   value.value = props.modelValue
//   watch(
//     () => props.modelValue,
//     (newVal) => {
//       value.value = newVal
//     }
//   )
// })

// watch(value, (newVal) => {
//   emits('update:modelValue', newVal)
// })

// onMounted(() => {})
</script>
