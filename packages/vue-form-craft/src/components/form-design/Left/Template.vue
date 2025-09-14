<template>
  <el-space wrap alignment="center">
    <el-button :key="name" v-for="{ name, schema } in templates" @click="useTemplate(schema)">
      {{ name }}
    </el-button>
  </el-space>
</template>

<script setup lang="ts">
import { template } from '@/config'
import { useDesignInstance } from '@vue-form-craft/core'

const designInstance = useDesignInstance()

const templates = designInstance.templates?.length ? designInstance.templates : template

const useTemplate = (schema: any) => {
  designInstance.updateSchema(schema)
}
</script>

<style></style>
