<template>
  <div :class="ns('linkageConfig')">
    <el-divider>{{ locale.attr.tab1.linkage.text }}</el-divider>
    <div style="font-size: 12px; color: #999; padding: 10px 0;">
      联动配置已统一使用 linkages，请在"联动"标签页中配置
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '@/hooks'
import { ns } from '@/utils'

defineOptions({
  name: 'LinkageConfig'
})

const locale = useLocale()
</script>
