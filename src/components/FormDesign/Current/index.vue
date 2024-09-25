<template>
  <el-tabs class="current-config">
    <el-tab-pane :label="locale.attr.tab1.title">
      <AttrEdit />
    </el-tab-pane>
    <el-tab-pane :label="locale.attr.tab2.title">
      <FormEdit />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import AttrEdit from './AttrEdit.vue'
import FormEdit from './FormEdit.vue'
import { $locale } from '@/config/symbol';
import { inject } from 'vue';

const locale = inject($locale)!
</script>

<style lang="less">
.current-config {
  .el-tabs__content {
    overflow: visible;
  }
}
</style>
