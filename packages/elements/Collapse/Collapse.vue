<template>
  <ElCollapse v-bind="props" v-model="activeKey">
    <ElCollapseItem v-for="item in children" :key="item.name" :name="item.name">
      <template #title>
        <Title :title="item.title" italic type="h4" />
      </template>

      <LayoutRender :children="item.children!" />
    </ElCollapseItem>
  </ElCollapse>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { LayoutRender } from '@vue-form-craft/components'
import Title from '../Title/Title.vue'
import type { CollapseItem } from '@vue-form-craft/types'

const thisProps = defineProps<{
  props: Record<string, any>
  children: CollapseItem[]
}>()

const activeKey = ref<string[]>([])

onMounted(() => {
  activeKey.value = thisProps.children.filter((item) => item.checked).map((item) => item.name)
})

// 补children
watch(
  () => thisProps.children,
  () => {
    thisProps.children.forEach((item) => {
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
