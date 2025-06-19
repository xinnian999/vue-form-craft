<template>
  <Dialog
    v-model="visible"
    :title="locale.actions.previewVueCode"
    width="70%"
    center
    destroy-on-close
    top="10vh"
  >
    <Tabs model-value="ts" class="demo-tabs">
      <TabPane label="Typescript" name="ts">
        <CodeHighLight style="height: 70vh" :code="tsVue(designInstance.schema)" language="vue" />
      </TabPane>
      <TabPane label="Javascript" name="js">
        <CodeHighLight style="height: 70vh" :code="jsVue(designInstance.schema)" language="vue" />
      </TabPane>
    </Tabs>
  </Dialog>
</template>

<script setup lang="ts">
import { tsVue, jsVue } from './config'
import { useDesignInstance, useLocale, useComponents } from '@form-magic/core'
import { CodeHighLight } from '@form-magic/components'

const { Dialog, Tabs, TabPane } = useComponents()

const designInstance = useDesignInstance()

const locale = useLocale()

const visible = defineModel<boolean>()
</script>
