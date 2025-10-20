<template>
  <ElCollapse v-bind="$attrs" v-model="activeKey">
    <ElCollapseItem v-for="item in children" :key="item.name" :name="item.name">
      <template #title>
        <Title.render :title="item.title" italic type="h4" />
      </template>

      <FormItemGroup v-model="item.children!" />
    </ElCollapseItem>
  </ElCollapse>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { FormItemGroup } from '@/components'
import { Title } from '@/elements'
import type { FormItemType } from '@/types'

type CollapseItem = {
  title: string
  name: string
  checked?: boolean
  children?: FormItemType[]
}

const children = defineModel<CollapseItem[]>({
  default: () => []
})

const activeKey = ref<string[]>([])

onMounted(() => {
  activeKey.value = children.value.filter((item) => item.checked).map((item) => item.name)
})

// 补children
watch(
  () => children.value,
  () => {
    children.value.forEach((item) => {
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
