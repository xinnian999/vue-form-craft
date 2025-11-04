<template>
  <el-tabs v-bind="$attrs" v-model="activeKey">
    <FormItemGroup :children="children" :designKey="designKey" />
  </el-tabs>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { FormItemGroup } from '@/components'
import type { FormItemType } from '@/types'

const props = defineProps<{
  children: FormItemType[]
  defaultKey: string
  designKey?: string
}>()

const activeKey = ref<string>('')

// const designInstance = useDesignInstance()

// 补children
// watch(
//   () => props.children,
//   () => {
//     designInstance.updateNodeByKey(props.defaultKey, {
//       children: props.children.map((item) => {
//         if (!item.children) {
//           item.children = []
//         }
//         if (!item.designKey) {
//           item.designKey = generateDesignKey()
//         }
//         return item
//       })
//     })
//   }
// )

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
