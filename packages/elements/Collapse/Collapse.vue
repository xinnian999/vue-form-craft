<template>
  <ElCollapse v-bind="props" v-model="activeKey">
    <ElCollapseItem v-for="item in children" :key="item.name" :name="item.name">
      <template #title>
        <Title :title="item.title" italic type="h4" />
      </template>
      <CanvasWrapper :children="item.children" v-if="formInstance.design" />
      <FormItemRender :formItems="item.children!" v-else />
    </ElCollapseItem>
  </ElCollapse>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { FormItemRender, CanvasWrapper } from '@vue-form-craft/components'
import Title from '../Title/Title.vue'
import type { CollapseItem } from '@vue-form-craft/config/commonType'
import { useFormInstance } from '@vue-form-craft/release'

const thisProps = defineProps<{
  props: Record<string, any>
  children: CollapseItem[]
}>()

const formInstance = useFormInstance()

const activeKey = ref<string[]>([])

onMounted(() => {
  activeKey.value = thisProps.children.filter((item) => item.checked).map((item) => item.name)
})
</script>

<style lang="scss">
.form-item-grid {
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
