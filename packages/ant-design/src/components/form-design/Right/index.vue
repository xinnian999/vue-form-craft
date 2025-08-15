<template>
  <div :class="ns('form-design-right')">
    <a-tabs v-model="designInstance.rightTab">
      <a-tab-pane v-if="designInstance.current" :label="locale.attr.tab1.title" name="attr">
        <AttrEdit v-model="designInstance.current" />
      </a-tab-pane>
      <a-tab-pane :label="locale.attr.tab2.title" name="form">
        <FormEdit />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { useDesignInstance, useLocale } from '@form-magic/core'
import AttrEdit from './AttrEdit/index.vue'
import FormEdit from './FormEdit.vue'
import { tools } from '@form-magic/core'
import { watch } from 'vue'

const { ns } = tools

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
