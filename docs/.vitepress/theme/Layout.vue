<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import en from 'element-plus/es/locale/lang/en'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { onMounted, provide } from 'vue'

const { lang } = useData()

provide('vfc-lang', lang)

onMounted(() => {
  document.cookie = `nf_lang=${lang.value}; expires=Mon, 1 Jan 2030 00:00:00 UTC; path=/`
  if (location.pathname === '/form-craft/') {
    location.href = location.href + `${lang.value}/`
  }
})
</script>

<template>
  <el-config-provider :locale="lang === 'en' ? en : zhCn">
    <DefaultTheme.Layout />
  </el-config-provider>
</template>
