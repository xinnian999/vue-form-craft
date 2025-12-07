<template>
  <el-radio-group v-model="currentUI" size="small" @change="onChangeUI">
    <el-radio-button v-for="[key, value] in Object.entries(uiConfig)" :key="key" :value="key">{{
      value.text
    }}</el-radio-button>
  </el-radio-group>
</template>

<script setup lang="ts">
import { uiConfig } from '~/uiConfig'
import { ref } from 'vue'

const searchParams = new URLSearchParams(window.location.search)

const currentUI = ref<keyof typeof uiConfig>(
  (searchParams.get('ui') as keyof typeof uiConfig) || 'elementPlus'
)

const onChangeUI = (val: any) => {
  window.location.href = `/form-design?ui=${val}`
}
</script>

<style></style>
