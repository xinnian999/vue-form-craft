<template>
  <el-dialog destroy-on-close v-model="visible" top="3vh" title="值联动">
    <FormRender v-model="designInstance.current!" :schema="linkageSchema()" />
  </el-dialog>
</template>

<script setup lang="ts">
import FormRender from '@vue-form-craft/element-plus/form-render'
import linkageSchema from './changeSchema'
import { useDesignInstance } from '@vue-form-craft/element-plus/hooks'

const designInstance = useDesignInstance()

const visible = defineModel<boolean>()
</script>
