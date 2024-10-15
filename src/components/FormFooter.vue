<template>
  <div class="vue-form-craft-footer" v-if="formInstance.footer">
    <el-button type="primary" @click="formInstance.submit">提交</el-button>
    <el-button @click="() => formInstance.resetFields()">重置</el-button>
  </div>
</template>

<script setup lang="ts">
import { useFormInstance } from '@vue-form-craft/release'
import { computed } from 'vue';

const formInstance = useFormInstance()

const formLabelWidth = computed(() => formInstance.schema.labelWidth + 'px')
</script>

<style lang="less">
.vue-form-craft-footer {
  margin-left: v-bind(formLabelWidth);
}
</style>
