<template>
  <div :class="ns('form-design-left')">
    <el-tabs v-model="tabKey" type="border-card" :class="ns('form-design-tabs')">
      <el-tab-pane v-for="{ title, key, render } in tabs" :key="key" :label="title" :name="key">
        <component :is="render" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ns,AI } from '@vue-form-craft/core'
import List from './List.vue'
import Template from './Template.vue'

const tabKey = ref('elements')

const tabs = [
  {
    title: '元素',
    key: 'elements',
    render: List
  },
  {
    title: '模板',
    key: 'templates',
    render: Template
  },
  {
    title: 'AI',
    key: 'ai',
    render: AI
  }
]
</script>
