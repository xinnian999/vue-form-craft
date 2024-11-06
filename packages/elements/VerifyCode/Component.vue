<template>
  <div class="vfc-verify-code">
    <el-input v-model="value" class="verify-input" :placeholder="placeholder" @blur="onBlur" />
    <div class="verify-code" ref="codeEl"></div>
  </div>
</template>

<script setup lang="ts">
import { useFormInstance } from '@vue-form-craft/hooks'
import GVerify from './gVerify'
import { onMounted, ref } from 'vue'

defineProps<{
  placeholder: string
}>()

const value = defineModel<string>()

const codeEl = ref<HTMLElement | null>(null)

const code = ref<GVerify | null>(null)

const formInstance = useFormInstance()

const onBlur = () => {
  if (!value.value) return

  const res = code.value?.validate(value.value)
  if (res) {
    formInstance.updateVCodePass(res)
  }
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
