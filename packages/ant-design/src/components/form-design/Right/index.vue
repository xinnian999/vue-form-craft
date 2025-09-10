<template>
  <div :class="ns('form-design-right')">
    <a-tabs v-model:activeKey="designInstance.rightTab">
      <a-tab-pane v-if="designInstance.current" :tab="locale.attr.tab1.title" key="attr">
        <AttrEdit v-model="designInstance.current" />
      </a-tab-pane>
      <a-tab-pane :tab="locale.attr.tab2.title" key="form">
        <FormEdit />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { ns, useDesignInstance, useLocale } from '@vue-form-craft/core'
import AttrEdit from './AttrEdit/index.vue'
import FormEdit from './FormEdit.vue'

const locale = useLocale()

const designInstance = useDesignInstance()

watch(
  () => designInstance.current,
  (val) => {
    if (!val) {
      designInstance.rightTab = 'form'
    }
  }
)
</script>
