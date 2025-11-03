<template>
  <el-tabs v-bind="$attrs" v-model="activeKey">
    <el-tab-pane v-for="item in children" :key="item.name" :label="item.label" :name="item.name">
      <FormItemGroup :children="item.children" :designKey="item.designKey!" />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { FormItemGroup } from '@/components'
// import { useDesignInstance } from '@/hooks'
import type { FormItemType } from '@/types'

// import { generateDesignKey } from '@/utils'

const props = defineProps<{
  children: FormItemType[]
  defaultKey: string
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
