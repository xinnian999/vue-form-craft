<template>
  <ElCollapse v-bind="{ ...props, ...$attrs }" v-model="activeKey">
    <ElCollapseItem v-for="item in children" :key="item.name" :name="item.name">
      <template #title>
        <Title :title="item.title" italic type="h4" />
      </template>
      <CanvasWrapper :children="item.children" v-if="design" />
      <FormItemRender :formItems="item.children" v-else />
    </ElCollapseItem>
  </ElCollapse>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue'
import { ElCollapse, ElCollapseItem } from 'element-plus'
import { FormItemRender, CanvasWrapper } from '@/components'
import Title from '../Title/Title.vue'
const thisProps = defineProps({
  props: Object,
  children: Array,
  design: Boolean
})

const activeKey = ref([])

onMounted(() => {
  activeKey.value = thisProps.children.filter((item) => item.checked).map((item) => item.name)
})
</script>

<style lang="less">
.form-item-grid {
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
