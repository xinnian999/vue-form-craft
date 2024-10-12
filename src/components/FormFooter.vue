<template>
  <div class="vue-form-craft-footer" v-if="footer">
    <el-button type="primary" @click="submit">提交</el-button>
    <el-button @click="() => resetFields()">重置</el-button>
  </div>
</template>

<script setup lang="ts">
import { useFormInstance } from '@vue-form-craft/release'
import { computed } from 'vue';

const { submit, resetFields, footer,schema } = useFormInstance()

const formLabelWidth = computed(() => schema.value.labelWidth + 'px')
</script>

<style lang="less">
.vue-form-craft-footer {
  margin-left: v-bind(formLabelWidth);
}
</style>
