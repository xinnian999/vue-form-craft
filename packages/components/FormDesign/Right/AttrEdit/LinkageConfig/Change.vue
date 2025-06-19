<template>
  <Dialog destroy-on-close v-model="visible" top="3vh" title="值联动">
    <FormRender v-model="designInstance.current!" :schema="linkageSchema()" />
  </Dialog>
</template>

<script setup lang="ts">
import linkageSchema from './changeSchema'
import { useComponents, useDesignInstance } from '@form-magic/core'
import { FormRender } from '@form-magic/components'

const { Dialog } = useComponents()

const designInstance = useDesignInstance()

const visible = defineModel<boolean>()
</script>
