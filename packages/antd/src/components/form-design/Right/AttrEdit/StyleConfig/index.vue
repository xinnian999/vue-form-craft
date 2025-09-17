<template>
  <div :class="ns('style-config')">
    <a-divider>组件样式</a-divider>
    <FormRender v-model="currentProps" :schema="basicSchema" ref="formRef" />
    <div class="more">
      <a-button type="primary" plain size="small" @click="visible = true">自定义更多样式</a-button>
    </div>

    <a-drawer v-model="visible" title="组件样式">
      <FormRender v-model="currentProps" :schema="schema" ref="formRef" style="padding: 0 15px" />
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import { FormRender } from '@/components'
import { ref } from 'vue'
import { ns } from '@vue-form-craft/core'
import basicSchema from './basicSchema'
import schema from './schema'

const currentProps = defineModel<Record<string, any>>()

const visible = ref(false)
</script>
