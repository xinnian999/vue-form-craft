<template>
  <div :style="InlineStyle">
    <FormRender v-model="value" :formItems="children" />
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import useStyle from '@/hooks/useStyle'
import { FormRender } from '@/components'

const thisProps = defineProps({
  modelValue: Object,
  props: Object,
  children: Array,
  design: Boolean,
  gap: Number
})

const InlineStyle = useStyle('Inline', thisProps.props)

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

<style></style>
