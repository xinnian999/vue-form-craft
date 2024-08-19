<template>
  <form-item v-for="item in formItems" :key="item.name" v-bind="item" />
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { FormItemType } from '@/config/commonType'
import FormItem from './FormItem.vue'

defineProps<{
  formItems: FormItemType[]
}>()
</script>
