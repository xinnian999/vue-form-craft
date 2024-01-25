<template>
  <span class="empty" v-if="!componentName">请输入全局注册得组件名</span>
  <component v-else :is="componentName" v-model="value" v-bind="$attrs" />
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue'

const thisProps = defineProps({
  componentName: String,
  modelValue: null
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return thisProps.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})
</script>

<style scoped>
.empty {
  font-size: 12px;
}
</style>
