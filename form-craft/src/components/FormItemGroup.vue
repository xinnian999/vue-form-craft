<template>
  <CanvasGroup v-if="formInstance.design" v-model="children" />

  <div v-else>
    <FormItem v-for="item in children" :key="item.name" v-bind="item" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CanvasGroup, FormItem } from '@/components'
import { useDesignInstance, useFormInstance } from '@/hooks'

const props = defineProps<{
  designKey: string
}>()

const formInstance = useFormInstance()

const designInstance = useDesignInstance()

const children = computed({
  get() {
    const schema = formInstance.getSchema()

    return props.designKey === 'root'
      ? schema.items
      : designInstance.getNodeByKey(props.designKey)?.children
  },
  set(value) {
    if (formInstance.design) {
      if (props.designKey === 'root') {
        designInstance.updateNodeByKey(props.designKey, {
          items: value
        })
      } else {
        designInstance.updateNodeByKey(props.designKey, {
          children: value
        })
      }
    }
  }
})
</script>
