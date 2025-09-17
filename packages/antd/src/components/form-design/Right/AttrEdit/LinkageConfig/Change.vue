<template>
  <a-modal destroy-on-close v-model:open="visible" top="3vh" title="值联动">
    <FormRender v-model="designInstance.current!" :schema="linkageSchema()" />
  </a-modal>
</template>

<script setup lang="ts">
import { FormRender } from '@/components'
import linkageSchema from './changeSchema'
import { useDesignInstance } from '@vue-form-craft/core'

const designInstance = useDesignInstance()

const visible = defineModel<boolean>()
</script>
