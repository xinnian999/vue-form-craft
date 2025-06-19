<template>
  <div :class="ns('linkageConfig')">
    <Divider>{{ locale.attr.tab1.linkage.text }}</Divider>

    <div :class="ns('linkageConfig-btns')">
      <Button
        v-for="{ title, onClick } in linkageBtns"
        :key="title"
        type="primary"
        plain
        size="small"
        @click="onClick"
        >{{ title }}</Button
      >
    </div>

    <Config v-model="configVisible" />
    <Change v-model="changeVisible" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useComponents, useLocale } from '@form-magic/core'
import { ns } from '@form-magic/core'
import Change from './Change.vue';
import Config from './Config.vue';

const { Button, Divider } = useComponents()

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
