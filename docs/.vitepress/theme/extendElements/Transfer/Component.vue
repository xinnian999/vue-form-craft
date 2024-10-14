<template>
  <el-transfer v-bind="$attrs" :data="data" @change="onChange" />
</template>

<script setup lang="ts">
import type { TransferDataItem, TransferKey } from 'element-plus'
import { useFormInstance } from 'vue-form-craft'

const props = defineProps<{ name: string; data: TransferDataItem[] }>()

const formInstance = useFormInstance()

const onChange = (value: TransferKey[]) => {
  const source = value.map((val) => props.data.find((v) => v.key === val))
  formInstance.updateSelectData(props.name, source)
}
</script>
