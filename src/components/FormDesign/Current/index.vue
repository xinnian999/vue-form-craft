<template>
  <el-tabs class="current-config">
    <el-tab-pane v-if="designInstance.current" :label="locale.attr.tab1.title">
      <AttrEdit v-model="designInstance.current" />
    </el-tab-pane>
    <el-tab-pane :label="locale.attr.tab2.title">
      <FormEdit />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { useDesignInstance, useLocale } from '@vue-form-craft/hooks';
import AttrEdit from './AttrEdit/index.vue'
import FormEdit from './FormEdit.vue'

const locale = useLocale()

const designInstance = useDesignInstance()
</script>

<style lang="less">
.current-config {
  .el-tabs__content {
    overflow: visible;
  }
}
</style>
