<template>
  <el-tabs v-bind="$attrs" v-model="activeKey">
    <el-tab-pane v-for="item in children" :key="item.name" v-bind="item">
      <FormItemGroup :list="item.children" />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { FormItemGroup } from '@vue-form-craft/components'
import type { FormItemType } from '@vue-form-craft/types'

type tabItem = {
  label: string
  name: string
  disabled?: boolean
  children: FormItemType[]
}

const props = defineProps<{
  children: tabItem[]
  defaultKey: string
}>()

const activeKey = ref<string>('')

// 补children
watch(
  () => props.children,
  () => {
    props.children.forEach((item) => {
      if (!item.children) {
        item.children = []
      }
    })
  }
)

onMounted(() => {
  if (props.defaultKey) {
    activeKey.value = props.defaultKey
  }
})
</script>

<style lang="scss">
.form-item-grid {
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
