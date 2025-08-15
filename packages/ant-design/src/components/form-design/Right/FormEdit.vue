<template>
  <FormRender v-model="form" :schema="formOptions"></FormRender>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { FormRender } from '@/components'
import formOptions from './formOptions'
import { useDesignInstance } from '@form-magic/core'

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
