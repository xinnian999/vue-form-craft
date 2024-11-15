<template>
  <ElCollapse v-bind="$attrs" v-model="activeKey">
    <ElCollapseItem v-for="item in children" :key="item.name" :name="item.name">
      <template #title>
        <Title :title="item.title" italic type="h4" />
      </template>

      <FormItemGroup :children="item.children!" />
    </ElCollapseItem>
  </ElCollapse>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { FormItemGroup } from '@vue-form-craft/components'
import Title from '../Title/Title.vue'
import type { FormItemType } from '@vue-form-craft/types'

type CollapseItem = {
  title: string
  name: string
  checked?: boolean
  children?: FormItemType[]
}

const props = defineProps<{
  children: CollapseItem[]
}>()

const activeKey = ref<string[]>([])

onMounted(() => {
  activeKey.value = props.children.filter((item) => item.checked).map((item) => item.name)
})

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
</script>

<style lang="scss">
.form-item-grid {
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
