<template>
  <el-input show-word-limit autocomplete="off" v-bind="$attrs" v-model="parseValue">
    <template #[selectPosition]>
      <el-select v-model="selectValue" :style="{ width: selectWidth + 'px' }" placeholder=" ">
        <el-option
          v-for="item in options"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
          :key="item.value"
        />
      </el-select>
    </template>
  </el-input>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    selectPosition?: 'prepend' | 'append'
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
    selectPosition: 'append',
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
