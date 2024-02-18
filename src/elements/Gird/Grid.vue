<template>
  <div :style="gridStyle" class="form-item-grid">
    <FormRender :formItems="children" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import useStyle from '@/hooks/useStyle'
import { FormRender } from '@/components'

const thisProps = defineProps({
  props: Object,
  children: Array
})
const gridStyle = useStyle('Grid', thisProps)
</script>

<style lang="less">
.form-item-grid {
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
