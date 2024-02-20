<template>
  <ElCollapse v-bind="{ ...props, ...$attrs }" v-model="activeKey">
    <ElCollapseItem v-for="item in children" :key="item.key" :title="item.title" :name="item.key">
      <CanvasWrapper :children="item.children" v-if="design" />
      <FormRender :formItems="item.children" v-else />
    </ElCollapseItem>
  </ElCollapse>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue'
import { ElCollapse, ElCollapseItem } from 'element-plus'
import { FormRender } from '@/components'
import CanvasWrapper from '@/FormDesign/Canvas/CanvasWrapper.vue'

const thisProps = defineProps({
  props: Object,
  children: Array,
  design: Boolean
})

const activeKey = ref([])

onMounted(() => {
  activeKey.value = thisProps.children.filter((item) => item.checked).map((item) => item.key)
})
</script>

<style lang="less">
.form-item-grid {
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
