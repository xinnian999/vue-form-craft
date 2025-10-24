<template>
  <div class="vfc-ObjGroup">
    <CanvasGroup v-if="formInstance.design" v-model="children" />
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
import { computed, inject, provide, ref, type Ref } from 'vue'
import { CanvasGroup, FormItem } from '@/components'
import { useDesignInstance, useFormInstance } from '@/hooks'
import type { FormItemType } from '@/types'

const props = defineProps<{
  children: FormItemType[]
  name: string
  designKey: string
}>()

const formInstance = useFormInstance()

const designInstance = useDesignInstance()

const objGroupBase = inject<Ref<string>>('$objGroupBase')

// 只初始化一次
const base = objGroupBase ? `${objGroupBase.value}.${props.name}` : props.name

const children = computed({
  get() {
    return props.children || []
  },
  set(val) {
    if (formInstance.design) {
      designInstance.updateNodeByKey(props.designKey, {
        children: val
      })
    }
  }
})

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
