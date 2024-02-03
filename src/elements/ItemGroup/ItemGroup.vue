<template>
  <FormRender v-if="props.type === 'object'" v-model="objectValue" :formItems="children" />

  <template v-else>
    <form-item
      v-for="(item, index) in children"
      :key="item.name"
      v-model="arrayValue[index]"
      v-bind="item"
      :prop="`${prop || name}[${index}]`"
    />
  </template>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { cloneDeep } from 'lodash'
import { FormRender, FormItem } from '@/components'

const thisProps = defineProps({
  modelValue: null,
  props: { type: Object, default: () => ({ type: 'object' }) },
  children: Array,
  name: String,
  prop: String
})

const emit = defineEmits(['update:modelValue'])

const objectValue = computed({
  get() {
    return thisProps.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

const arrayValue = computed(() => {
  return new Proxy(thisProps.modelValue || [], {
    set(target, key, value) {
      const arr = cloneDeep(target)
      arr[key] = value
      emit('update:modelValue', arr)
      return true
    }
  })
})
</script>
