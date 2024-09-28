<template>
  <el-dialog destroy-on-close v-model="visible" top="3vh" title="配置项联动">
    <div style="font-weight: bold; margin-bottom: 10px">
      直接将需要动态设置的配置项，改为模版表达式即可
    </div>

    <json-editor-vue
      class="editor"
      v-model="current"
      currentMode="code"
      :modeList="['text', 'view', 'tree', 'code', 'form']"
      :options="{ search: true, history: true }"
      language="zh"
    />
  </el-dialog>
</template>

<script setup lang="ts">
import type { FormItemType } from '@/release';
import JsonEditorVue from 'json-editor-vue3'

const visible = defineModel<boolean>('visible')
const current = defineModel<FormItemType>('current')
</script>
