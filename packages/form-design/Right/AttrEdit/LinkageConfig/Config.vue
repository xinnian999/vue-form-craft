<template>
  <el-dialog
    destroy-on-close
    v-model="visible"
    top="3vh"
    :title="`${designInstance.current?.label} - 配置级联动`"
    width="75vw"
    center
  >
    <JsonEdit.render v-model="designInstance.current!" />
  </el-dialog>
</template>

<script setup lang="ts">
import { useDesignInstance } from '@vue-form-craft/hooks'
import { JsonEdit } from '@vue-form-craft/elements'

const designInstance = useDesignInstance()

const visible = defineModel<boolean>()
</script>
