<template>
  <el-dialog destroy-on-close v-model="visible" top="3vh" title="数据联动">
    <FormRender v-model="designInstance.current!" :schema="linkageSchema()" />
  </el-dialog>
</template>

<script setup lang="ts">
import { FormRender } from '@/components'
import { useDesignInstance } from '@/hooks'
import linkageSchema from './changeSchema'

const designInstance = useDesignInstance()

const visible = defineModel<boolean>()
</script>
