<template>
  <div class="vfc-verify-code">
    <el-input v-model="input" class="verify-input" :placeholder="placeholder" @blur="onBlur" />
    <div class="verify-code" ref="codeEl"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import GVerify from './gVerify'

defineProps<{
  placeholder: string
}>()

const value = defineModel<boolean>()

const input = ref<string>()

const codeEl = ref<HTMLElement | null>(null)

const code = ref<GVerify | null>(null)

const onBlur = () => {
  if (!input.value) return

  value.value = code.value?.validate(input.value)
}

onMounted(() => {
  code.value = new GVerify(codeEl.value)
})
</script>

<style lang="scss" scoped>
.vfc-verify-code {
  display: flex;
  align-items: center;
  gap: 10px;
  .verify-input {
    width: 150px;
  }

  .verify-code {
    width: 80px;
    height: 30px;
  }
}
</style>
