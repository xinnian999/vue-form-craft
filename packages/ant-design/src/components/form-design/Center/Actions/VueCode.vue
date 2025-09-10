<template>
  <a-modal
    v-model:open="visible"
    :title="locale.actions.previewVueCode"
    width="70%"
    centered
    destroy-on-close
    top="10vh"
  >
    <a-tabs v-model="tabKey" class="demo-tabs">
      <a-tab-pane tab="Typescript" key="ts">
        <CodeHighLight style="height: 70vh" :code="tsVue(designInstance.schema)" language="vue" />
      </a-tab-pane>
      <a-tab-pane tab="Javascript" key="js">
        <CodeHighLight style="height: 70vh" :code="jsVue(designInstance.schema)" language="vue" />
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script setup lang="ts">
import { CodeHighLight } from '@vue-form-craft/core'
import { tsVue, jsVue } from './config'
import { useDesignInstance, useLocale } from '@vue-form-craft/core'
import { ref } from 'vue'

const tabKey = ref('ts')

const designInstance = useDesignInstance()

const locale = useLocale()

const visible = defineModel<boolean>()
</script>
