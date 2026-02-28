<template>
  <FormItemGroup :list="parseList" :designKey="formItemProps.designKey" :style="parseStyle" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { FormItemGroup } from '@/components'
import { useFormInstance } from '@/hooks'
import type { ComponentBaseProps } from '@/types'

const props = defineProps<ComponentBaseProps>()

// 只初始化一次
const base = props.formItemProps.name

const parseList = computed(() => {
  return (
    props.formItemProps.items?.map((item) => ({
      ...item,
      name: `${base}.${item.name}`
    })) || []
  )
})

const formInstance = useFormInstance()

const parseStyle = computed(() => {
  const style: any = {
    width: '100%',
    boxSizing: 'border-box'
  }

  if (formInstance?.getDesign()) {
    style.background = '#f4f3f3'
    style.padding = '10px'
  }

  return style
})

// watchEffect(()=>{
//   console.log(objGroupBase?.value);
// })
</script>

<style lang="scss">
.vfc-ObjGroup {
  position: relative;
  width: 100%;

  .vfc-ObjGroup-render {
    .el-form-item {
      margin-bottom: 18px;
    }
  }
}
</style>
