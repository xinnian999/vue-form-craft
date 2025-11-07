<template>
  <el-tabs v-bind="$attrs" v-model="activeKey">
    <FormItemGroup :children="children" :designKey="designKey" group="TabItem" />
  </el-tabs>

  <div class="action" v-if="formInstance.design">
    <el-button type="primary" @click="handleAddTab">添加标签页</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FormItemGroup } from '@/components'
import { useChildrenModel, useFormInstance } from '@/hooks'
import type { FormItemType } from '@/types'

const props = defineProps<{
  children: FormItemType[]
  defaultKey: string
  designKey?: string
}>()

const activeKey = ref<string>(props.defaultKey)

const childrenModel = useChildrenModel(props)

const formInstance = useFormInstance()

const handleAddTab = () => {
  childrenModel.value = childrenModel.value.concat({
    label: `选项卡${childrenModel.value.length + 1}`,
    name: `name${childrenModel.value.length + 1}`,
    component: 'TabPane',
    children: [],
    designKey: `tab-${childrenModel.value.length + 1}`
  })
}
</script>

<style scoped>
.action {
  margin: 10px 0;
  text-align: center;
}
</style>
