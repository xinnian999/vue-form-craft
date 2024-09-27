<template>
  <el-tabs class="current-config">
    <el-tab-pane v-if="current" :label="locale.attr.tab1.title">
      <AttrEdit />
    </el-tab-pane>
    <el-tab-pane :label="locale.attr.tab2.title">
      <FormEdit />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import AttrEdit from './AttrEdit/index.vue'
import FormEdit from './FormEdit.vue'
import { $current, $locale } from '@/config/symbol'
import { inject } from 'vue'

const locale = inject($locale)!

const { current } = inject($current)!
</script>

<style lang="less">
.current-config {
  .el-tabs__content {
    overflow: visible;
  }
}
</style>
