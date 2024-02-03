<template>
  <form-item
    v-for="item in formItems"
    :key="item.name"
    v-model="values[item.name]"
    v-bind="item"
    :prop="name && `${prop || name}.${item.name}`"
  />
</template>

<script setup>
import { defineProps, defineEmits, computed, provide } from 'vue'
import FormItem from './FormItem.vue'
import { mergeWith } from 'lodash'

const props = defineProps({
  modelValue: Object,
  formItems: Array,
  name: String,
  prop: String
})

const emit = defineEmits(['update:modelValue'])

//上一级的value
// const beforeValue = computed({
//   get() {
//     return props.modelValue
//   },
//   set(val) {
//     emit('update:modelValue', val)
//   }
// })

// provide('$beforeValue', beforeValue)

// 将子字段合成一个字段
const values = computed(() => {
  return new Proxy(props.modelValue || {}, {
    set(target, key, value) {
      //字段值为对象时，需要与上一次值深度合并（itemGroup）,数组不合并
      const mergeValue = mergeWith(target, { [key]: value }, (objValue, srcValue) => {
        if (Array.isArray(srcValue)) {
          return srcValue
        }
      })

      // console.log(mergeValue)
      emit('update:modelValue', mergeValue)
      return true
    }
  })
})
</script>
