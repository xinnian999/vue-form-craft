<template>
  <form-item v-for="item in formItems" :key="item.name" v-bind="item" />
</template>

<script setup lang="ts">
import type { FormItemType } from '@vue-form-craft/types'
import FormItem from './FormItem.vue'

defineProps<{
  formItems: FormItemType[]
}>()
</script>
