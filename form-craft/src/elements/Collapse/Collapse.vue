<template>
  <ElCollapse v-bind="$attrs" v-model="activeKey">
    <ElCollapseItem v-for="item in children" :key="item.name" :name="item.name">
      <template #title>
        <Title.render :title="item.title" italic type="h4" />
      </template>

      <FormItemGroup :list="item.children!" :designKey="item.designKey!" />
    </ElCollapseItem>
  </ElCollapse>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { FormItemGroup } from '@/components'
import { Title } from '@/elements'
import type { FormItemType } from '@/types'

const props = defineProps<{
  children: FormItemType[]
  defaultKey: string
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
