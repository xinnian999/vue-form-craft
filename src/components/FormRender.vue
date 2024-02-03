<template>
  <form-item
    v-for="item in formItems"
    :key="item.name"
    v-model="formValues[item.name]"
    v-bind="item"
    :prop="name && `${prop || name}.${item.name}`"
  />
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import FormItem from './FormItem.vue'
import { mergeWith } from 'lodash'

const props = defineProps({
  modelValue: Object,
  formItems: Array,
  name: String,
  prop: String
})

const emit = defineEmits(['update:modelValue'])

// 通过Proxy接管的数据源，某项属性被修改会立刻通知父组件，遵守单项数据流原则
const formValues = computed(() => {
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
