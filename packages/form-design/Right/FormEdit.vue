<template>
    <FormRender v-model="form" :schema="formOptions"></FormRender>
</template>

<script setup>
import { computed } from 'vue'
import FormRender from '../../form-render'
import formOptions from './formOptions'
import { useDesignInstance } from '@vue-form-craft/hooks';

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