<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { watchEffect } from 'vue'

const { lang } = useData()
watchEffect(() => {
  document.cookie = `nf_lang=${lang.value}; expires=Mon, 1 Jan 2030 00:00:00 UTC; path=/`
  if (location.pathname === '/vue-form-craft/') {
    location.href = location.href + 'zh/'
  }
})
</script>

<template>
  <DefaultTheme.Layout />
</template>
