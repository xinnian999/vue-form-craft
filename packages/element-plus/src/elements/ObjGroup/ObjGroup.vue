<template>
  <div class="vfc-ObjGroup">
    <CanvasGroup v-if="formInstance.design" :list="children" />
    <div v-else class="vfc-ObjGroup-render">
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
import { CanvasGroup, FormItem } from '@form-magic/components'
import type { FormItemType } from '@form-magic/core'
import { useFormInstance } from '@form-magic/core'
import { inject, provide, ref, type Ref } from 'vue'

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
