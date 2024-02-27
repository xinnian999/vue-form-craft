<template>
  <form-item v-for="item in formItems" :key="item.name" v-bind="item" />
</template>

<script setup>
import { defineProps } from 'vue'
import FormItem from './FormItem.vue'
defineProps({
  formItems: Array
})
</script>
