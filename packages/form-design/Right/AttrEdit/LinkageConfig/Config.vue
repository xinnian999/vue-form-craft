<template>
  <el-dialog destroy-on-close v-model="visible" top="3vh" title="配置级联动">
    <FormRender v-model="designInstance.current!" :schema="configSchema" />
  </el-dialog>
</template>

<script setup lang="ts">
import FormRender from '@vue-form-craft/form-render'
import configSchema from './configSchema'
import { useDesignInstance } from '@vue-form-craft/hooks'

const designInstance = useDesignInstance()

const visible = defineModel<boolean>()
</script>
