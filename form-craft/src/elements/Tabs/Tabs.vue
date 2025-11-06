<template>
  <el-tabs v-bind="$attrs" v-model="activeKey">
    <FormItemGroup :children="children" :designKey="designKey" />
  </el-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FormItemGroup } from '@/components'
import type { FormItemType } from '@/types'

const props = defineProps<{
  children: FormItemType[]
  defaultKey: string
  designKey?: string
}>()

const activeKey = ref<string>(props.defaultKey)
</script>
