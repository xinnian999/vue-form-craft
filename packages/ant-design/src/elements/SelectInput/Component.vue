<template>
  <a-input show-word-limit autocomplete="off" v-bind="$attrs" v-model:value="parseValue">
    <template #[selectPosition]>
      <a-select v-model:value="selectValue" :style="{ width: selectWidth + 'px' }" placeholder=" ">
        <a-select-option
          v-for="item in options"
          :value="item.value"
          :disabled="item.disabled"
          :key="item.value"
        >
          {{ item.label }}
        </a-select-option>
      </a-select>
    </template>
  </a-input>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    selectPosition?: 'prefix' | 'suffix'
    selectWidth?: number
    selectInitialValue?: string
    options?: {
      label: string
      value: any
      disabled?: boolean
    }[]
    parse?: (value: string, selectValue: any) => string
  }>(),
  {
    selectPosition: 'suffix',
    selectWidth: 70,
    options: () => []
  }
)

const value = defineModel<string>({
  default: ''
})

const selectValue = ref('')

const parseValue = computed({
  get() {
    return value.value?.replaceAll(selectValue.value, '')
  },
  set(val) {
    if (val) {
      value.value = val + selectValue.value
    } else {
      value.value = val
    }
  }
})

watch(selectValue, (newVal, oldVal) => {
  if (value.value) {
    value.value = value.value?.replaceAll(oldVal, '') + newVal
  }
})

onMounted(() => {
  if (props.selectInitialValue) {
    selectValue.value = props.selectInitialValue
  }
})
</script>

<style></style>
