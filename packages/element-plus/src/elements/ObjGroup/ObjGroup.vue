<template>
  <div class="fm-ObjGroup">
    <CanvasGroup v-if="formInstance.design" :list="children" />
    <div v-else class="fm-ObjGroup-render">
      <FormItem
        v-for="item in children"
        :key="item.name"
        v-bind="item"
        :name="`${base}.${item.name}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { FormItem } from '@/components'
import { inject, provide, ref, type Ref } from 'vue'
import type { FormItemType } from '@form-magic/core'
import { CanvasGroup, useFormInstance } from '@form-magic/core'

const props = defineProps<{
  children: FormItemType[]
  name: string
}>()

const formInstance = useFormInstance()

const objGroupBase = inject<Ref<string>>('$objGroupBase')

// 只初始化一次
const base = objGroupBase ? `${objGroupBase.value}.${props.name}` : props.name

// watchEffect(()=>{
//   console.log(objGroupBase?.value);
// })

provide('$objGroupBase', ref(base))
</script>

<style lang="scss">
.fm-ObjGroup {
  position: relative;
  width: 100%;

  .fm-ObjGroup-render {
    .el-form-item {
      margin-bottom: 18px;
    }
  }
}
</style>
