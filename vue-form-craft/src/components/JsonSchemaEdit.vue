<template>
  <div :class="ns('save-json-edit')">
    <JsonEditor v-model="json" v-bind="$attrs" />
    <div class="footer">
      <el-button @click="save" type="primary">保存更改</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ns } from '@/utils'
import JsonEditor from './JsonEditor/index.vue'

const modelValue = defineModel<Record<string, any>>()

const json = ref<Record<string, any>>({})

const save = () => {
  modelValue.value = json.value
}

onMounted(() => {
  json.value = modelValue.value || {}
})
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
