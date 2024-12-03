<template>
  <el-dialog destroy-on-close v-model="visible" top="3vh" title="值联动">
    <FormRender v-model="designInstance.current!" :schema="linkageSchema(designInstance.schema)" />
  </el-dialog>
</template>

<script setup lang="ts">
import FormRender from '@vue-form-craft/form-render'
import linkageSchema from './changeSchema'
import { useDesignInstance } from '@vue-form-craft/hooks'

const designInstance = useDesignInstance()

const visible = defineModel<boolean>()
</script>
