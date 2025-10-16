<template>
  <div :class="ns('save-json-edit')">
    <JsonEditor v-model="data" v-bind="$attrs" />
    <div class="footer">
      <el-button @click="save" type="primary">保存更改</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T = FormSchema">
import { ref } from 'vue'
import type { FormSchema } from '@/types'
import { ns } from '@/utils'
import JsonEditor from './JsonEditor/index.vue'

const props = defineProps<{
  json: T
}>()

const emits = defineEmits<{
  save: [json: T]
}>()

const data = ref<T>(props.json)

const save = () => {
  emits('save', data.value)
}
</script>

<style scoped lang="scss">
@import '@/style.scss';

@include ns('save-json-edit') {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .footer {
    text-align: center;
  }
}
</style>
