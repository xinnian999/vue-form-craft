<template>
  <FormRender v-model="form" :schema="formOptions"></FormRender>
</template>

<script setup lang="ts">
import { FormRender } from '@/components'
import { useDesignInstance } from '@/hooks'
import { computed } from 'vue'
import formOptions from './formOptions'

const designInstance = useDesignInstance()

//修改schema除了items的其他属性
const form = computed({
  get() {
    return designInstance.schema
  },
  set(value) {
    designInstance.updateSchema(value)
  }
})
</script>
