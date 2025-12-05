<template>
  <div>
    <ElCollapse v-bind="$attrs" v-model="activeKey">
      <ElCollapseItem
        v-for="item in formItemProps.children"
        :key="item.name"
        :title="item.label"
        :name="item.name"
      >
        <FormItemGroup :list="item.children!" />
      </ElCollapseItem>
    </ElCollapse>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FormItemGroup } from '@/components'
import type { ComponentBaseProps } from '@/types'

const props = defineProps<ComponentBaseProps>()

// 直接在初始化时设置默认展开的面板
const activeKey = ref<string[]>(
  props.formItemProps.children?.filter((item) => item.props?.checked).map((item) => item.name) || []
)
</script>
