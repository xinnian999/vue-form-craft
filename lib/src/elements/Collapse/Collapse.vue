<template>
  <ElCollapse v-bind="$attrs" v-model="activeKey">
    <FormItemGroup :list="children" group="CollapseItem" />
  </ElCollapse>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { FormItemGroup } from '@/components'
import type { FormItemType } from '@/types'

const props = defineProps<{
  children: FormItemType[]
}>()

const activeKey = ref<string[]>([])

onMounted(() => {
  activeKey.value =
    props.children?.filter((item) => item.props?.checked).map((item) => item.name) || []
})
</script>
