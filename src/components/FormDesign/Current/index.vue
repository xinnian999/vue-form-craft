<template>
  <el-tabs class="current-config">
    <el-tab-pane label="字段配置">
      <AttrEdit />
    </el-tab-pane>
    <el-tab-pane label="表单配置">
      <FormEdit />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { ElTabs, ElTabPane } from 'element-plus'

import AttrEdit from './AttrEdit.vue'
import FormEdit from './FormEdit.vue'
</script>

<style lang="less">
.current-config {
  .el-tabs__content {
    overflow: visible;
  }
}
</style>
