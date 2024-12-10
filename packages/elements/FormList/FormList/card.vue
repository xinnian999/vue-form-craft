<template>
  <el-card v-for="(item, index) in list" :key="item.key" class="list-card">
    <template #header>
      <div class="card-header">
        <span>{{ title + (index + 1) }}</span>
        <slot name="reduce" :index="index" />
      </div>
    </template>
    <form-item
      v-for="field in parseFields(index)"
      v-bind="field"
      :key="field.label"
      class="list-card-item"
      :name="`${name}.${index}.${field.name}`"
    />
  </el-card>
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

<style lang="scss">
.list-card {
  margin-bottom: 10px;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .list-card-item {
    margin-bottom: 15px;
  }
}
</style>
