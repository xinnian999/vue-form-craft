<template>
  <div v-for="(item, index) in list" :key="item.key" class="list-item">
    <div class="list-item-content">
      <form-item
        v-for="field in parseFields(index)"
        v-bind="field"
        :key="field.label"
        :name="`${name}.${index}.${field.name}`"
      />

      <slot name="reduce" :index="index" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { FormItem } from '@vue-form-craft/components'
import type { FormItemType } from '@vue-form-craft/types'

interface Props {
  list: Record<string, any>[]
  fields: FormItemType[]
  name: string
  title: string
  parseFields: (index: number) => FormItemType[]
}

withDefaults(defineProps<Props>(), {
  fields: () => []
})
</script>

<style scoped lang="scss">
.list-item {
  margin-bottom: 10px;
  .list-item-content {
    display: flex;
    align-items: center;
    // width: 100%;
  }
}
</style>
