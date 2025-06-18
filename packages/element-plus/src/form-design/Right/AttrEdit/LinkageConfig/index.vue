<template>
  <div :class="ns('linkageConfig')">
    <el-divider>{{ locale.attr.tab1.linkage.text }}</el-divider>

    <div :class="ns('linkageConfig-btns')">
      <el-button
        v-for="{ title, onClick } in linkageBtns"
        :key="title"
        type="primary"
        plain
        size="small"
        @click="onClick"
        >{{ title }}</el-button
      >
    </div>

    <Config v-model="configVisible" />
    <Change v-model="changeVisible" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLocale } from '@/hooks'
import { ns } from '@form-magic/core'
import Change from './Change.vue';
import Config from './Config.vue';

const locale = useLocale()

const configVisible = ref(false)

const changeVisible = ref(false)

const linkageBtns = [
  {
    title: locale.value.attr.tab1.linkage.action1,
    onClick: () => {
      configVisible.value = true
    }
  },
  {
    title: locale.value.attr.tab1.linkage.action2,
    onClick: () => {
      changeVisible.value = true
    }
  }
]
</script>
