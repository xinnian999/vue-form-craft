<template>
  <div v-if="formInstance.read">
    {{ value?.map((val) => data.find((v) => v.key === val)?.label).join('、') }}
  </div>
  <el-transfer v-else v-bind="$attrs" :data="data" @change="onChange" v-model="value" />
</template>

<script setup lang="ts">
import type { TransferDataItem, TransferKey } from 'element-plus'
import { useFormInstance } from '@/hooks'

const props = defineProps<{ name: string; data: TransferDataItem[] }>()

const formInstance = useFormInstance()

const value = defineModel<TransferKey[]>()

const onChange = (value: TransferKey[]) => {
  const source = value.map((val) => props.data.find((v) => v.key === val))
  formInstance.updateSelectData(props.name, source)
}
</script>
