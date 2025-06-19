<template>
  <el-dialog
    v-model="visible"
    :title="locale.actions.previewVueCode"
    width="70%"
    center
    destroy-on-close
    top="10vh"
  >
    <el-tabs model-value="ts" class="demo-tabs">
      <el-tab-pane label="Typescript" name="ts">
        <CodeHighLight style="height: 70vh" :code="tsVue(designInstance.schema)" language="vue" />
      </el-tab-pane>
      <el-tab-pane label="Javascript" name="js">
        <CodeHighLight style="height: 70vh" :code="jsVue(designInstance.schema)" language="vue" />
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script setup lang="ts">
import { CodeHighLight } from '@form-magic/core'
import { tsVue, jsVue } from './config'
import { useDesignInstance, useLocale } from '@form-magic/core';

const designInstance = useDesignInstance()

const locale = useLocale()

const visible = defineModel<boolean>()
</script>
