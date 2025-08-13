<template>
  <span class="empty" v-if="!componentName">请输入全局注册得组件名</span>
  <component v-else :is="componentName" v-model="value" v-bind="$attrs" />
</template>

<script setup lang="ts">
defineProps<{
  componentName?: string
}>()

const value = defineModel<any>()
</script>

<style scoped>
.empty {
  font-size: 12px;
}
</style>
