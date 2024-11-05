<template>
  <ElCollapse v-bind="props" v-model="activeKey">
    <ElCollapseItem v-for="item in children" :key="item.name" :name="item.name">
      <template #title>
        <Title :title="item.title" italic type="h4" />
      </template>
      <CanvasWrapper v-if="formInstance.design" :children="item.children!" />
      <template v-else>
        <FormItem v-for="v in item.children" :key="v.name" v-bind="v" />
      </template>
    </ElCollapseItem>
  </ElCollapse>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { FormItem } from '@vue-form-craft/components'
import { CanvasWrapper } from '@vue-form-craft/form-design'
import Title from '../Title/Title.vue'
import type { CollapseItem } from '@vue-form-craft/types'
import { useFormInstance } from '@vue-form-craft/hooks'

const thisProps = defineProps<{
  props: Record<string, any>
  children: CollapseItem[]
}>()

const formInstance = useFormInstance()

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
