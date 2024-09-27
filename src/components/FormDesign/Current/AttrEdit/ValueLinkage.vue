<template>
  <el-dialog destroy-on-close v-model="visible" top="3vh" title="值联动">
    <FormRender v-model="current!" :schema="linkageSchema(schema, current)" />
  </el-dialog>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { $current } from '@/config/symbol'
import { FormRender } from '@/components'
import linkageSchema from '../linkageSchema'
import { $schema } from '@/config/symbol'

const { current } = inject($current)!

const { schema } = inject($schema)!

const visible = defineModel<boolean>()
</script>
