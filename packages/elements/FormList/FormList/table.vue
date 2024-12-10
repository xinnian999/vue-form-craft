<template>
  <el-table :data="list" style="width: 100%">
    <el-table-column
      :prop="item.name"
      :label="item.label"
      :key="item.name"
      v-for="item in fields"
      v-bind="pickBy(item, Boolean)"
      :formatter="formatter"
    />
    <el-table-column fixed="right" min-width="60">
      <template #default="record">
        <slot name="reduce" :index="record.$index" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { FormItem } from '@vue-form-craft/components'
import { pickBy } from 'lodash'
import type { FormItemType } from '@vue-form-craft/types'
import type { TableColumnCtx } from 'element-plus'

interface Props {
  fields: FormItemType[]
  name: string
  list: Record<string, any>[]
  parseFields: (index: number) => FormItemType[]
}

const props = withDefaults(defineProps<Props>(), {
  fields: () => []
})

const formatter = (row: any, column: TableColumnCtx<any>, cellValue: any, index: number) => {
  const { parseFields, name } = props
  const colIndex = column.no
  const field = parseFields(index)[colIndex]

  return h(FormItem, {
    ...field,
    hideLabel: true,
    style: { marginBottom: 0 },
    name: `${name}.${index}.${field.name}`
  })
}
</script>
