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
        <CodeHighLight style="height: 70vh" :code="tsVue(schema)" language="vue" />
      </el-tab-pane>
      <el-tab-pane label="Javascript" name="js">
        <CodeHighLight style="height: 70vh" :code="jsVue(schema)" language="vue" />
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { $schema } from '@vue-form-craft/config/symbol'
import { CodeHighLight } from '@vue-form-craft/components'
import { tsVue, jsVue } from './config'
import { useLocale } from '@vue-form-craft/hooks';

const { schema } = inject($schema)!

const locale = useLocale()

const visible = defineModel<boolean>()
</script>
