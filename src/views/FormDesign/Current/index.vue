<template>
  <el-tabs>
    <el-tab-pane label="字段配置">
      <AttrEdit />
    </el-tab-pane>
    <el-tab-pane label="表单配置">
      <FormEdit />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import AttrEdit from "./AttrEdit.vue";
import FormEdit from "./FormEdit.vue";
</script>

<style></style>
