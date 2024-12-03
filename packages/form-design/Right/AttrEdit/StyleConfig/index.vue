<template>
  <div :class="ns('style-config')">
    <el-divider>组件样式</el-divider>
    <FormRender v-model="currentProps" :schema="basicSchema" ref="formRef" />
    <div class="more">
      <el-button type="primary" plain size="small" @click="visible = true"
        >自定义更多样式</el-button
      >
    </div>

    <el-drawer v-model="visible" title="组件样式">
      <FormRender v-model="currentProps" :schema="schema" ref="formRef" style="padding: 0 15px;" />
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormRender from '@vue-form-craft/form-render'
import { ns } from '@vue-form-craft/utils'
import basicSchema from './basicSchema'
import schema from './schema'

const currentProps = defineModel<Record<string, any>>()

const visible = ref(false)
</script>
