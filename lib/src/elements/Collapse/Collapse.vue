<template>
  <div>
    <Collapse v-bind="$attrs" v-model="activeKey">
      <CollapseItem
        v-for="item in formItemProps.items"
        :key="item.name"
        :title="item.label"
        :name="item.name"
      >
        <FormItemGroup :list="item.items!" :designKey="item.designKey!" />
      </CollapseItem>
    </Collapse>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FormItemGroup } from '@/components'
import { useUI } from '@/hooks'
import type { ComponentBaseProps } from '@/types'

const { Collapse, CollapseItem } = useUI()

const props = defineProps<ComponentBaseProps>()

// 直接在初始化时设置默认展开的面板
const activeKey = ref<string[]>(
  props.formItemProps.items
    ?.filter((item) => item.componentProps?.checked)
    .map((item) => item.name) || []
)
</script>
