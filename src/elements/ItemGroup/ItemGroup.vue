<template>
  <FormRender v-model="value" :formItems="children" />
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { FormRender } from '@/components'

const thisProps = defineProps({
  modelValue: null,
  props: Object,
  children: Array
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
