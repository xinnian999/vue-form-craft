<template>
  <div :class="ns('formList')">
    <div v-if="formInstance.design">
      <el-card v-if="mode === 'card'" header="自增卡片" class="card-list-container">
        <FormItemGroup :list="fields" />
      </el-card>

      <FormItemGroup v-else-if="mode === 'table'" :list="fields" class="table-list-design" />
    </div>

    <div v-else>
      <template v-if="mode === 'card'">
        <el-card v-for="(item, index) in list" :key="item.key" class="list-card">
          <template #header>
            <div class="card-header">
              <span>{{ title + (index + 1) }}</span>
              <Button
                v-if="allowReduce && !isMin"
                @click="handleReduceItem(index)"
                circle
                type="primary"
                class="list-btn reduceBtn"
                :disabled="disabled"
                size="small"
              >
                <template #icon> <Icon name="reduce" color="#fff" /> </template>
              </Button>
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

      <el-table
        v-if="mode === 'table' && list.length"
        :data="list"
        style="width: 100%"
        class="table-list-render"
      >
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
            <Button
              v-if="allowReduce && !isMin"
              @click="handleReduceItem(record.$index)"
              circle
              type="primary"
              class="list-btn reduceBtn"
              :disabled="disabled"
              size="small"
              plain
            >
              <template #icon> <Icon name="reduce" /> </template
            ></Button>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-top: 5px">
        <Button
          v-if="allowAdd && !isMax"
          @click="handleAddItem"
          type="primary"
          class="list-btn addBtn"
          :disabled="disabled"
          size="small"
          plain
        >
          <template #icon> <Icon name="add" /></template>
          {{ title }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TableColumnCtx } from 'element-plus'
import { cloneDeep, isEqual, pickBy, set } from 'lodash'
import { computed, h, onMounted, provide, ref, watch } from 'vue'
import { FormItem, FormItemGroup, Icon } from '@/components'
import { useFormInstance, useUI } from '@/hooks'
import type { ComponentBaseProps, FormItemType } from '@/types'
import { deepParse, ns } from '@/utils'

const { Button } = useUI()

interface Props extends ComponentBaseProps {
  allowAdd?: boolean
  allowReduce?: boolean
  minLines?: number
  maxLines?: number
  mode?: 'table' | 'card' | 'inline'
  title?: string
  name?: string
  disabled?: boolean
  getNewItem?: (index: number) => Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  allowAdd: true,
  allowReduce: true,
  minLines: 0,
  maxLines: 999,
  mode: 'table',
  title: '',
  name: ''
})

const list = defineModel<Record<string, any>[]>({ default: [] })

const cIndex = ref(0)
const listSnapshot = ref<Record<string, any>[]>([])

const formInstance = useFormInstance()

const fields = computed(() => props.formItemProps?.children || [])

const parseFields = (index: number) => {
  const currentItem = list.value[index]
  const context = { $item: currentItem, $index: index }

  // 先深度解析字段
  let parsedFields = deepParse(fields.value, context)

  // 处理单行 attr 联动
  parsedFields = parsedFields.map((field: FormItemType) => {
    const fieldCopy = cloneDeep(field)

    // 遍历所有字段的 linkages,找到目标为当前字段的单行 attr 联动
    fields.value.forEach((sourceField: FormItemType) => {
      if (!sourceField.linkages) return

      sourceField.linkages.forEach((linkage) => {
        // 只处理单行 attr 联动 (target 包含 .[])
        if (linkage.type === 'attr' && linkage.target.includes('.[]')) {
          const targetFieldName = linkage.target.split('.[].').pop()

          // 如果当前字段是联动目标
          if (targetFieldName === field.name) {
            // 解析 condition
            let conditionResult = true
            if (linkage.condition !== undefined) {
              conditionResult = deepParse(linkage.condition, context)
            }

            // 如果 condition 为 true,应用联动
            if (conditionResult) {
              const actualPath = linkage.path === 'custom' ? linkage.customPath : linkage.path
              if (actualPath) {
                const linkageValue = deepParse(linkage.value, context)
                set(fieldCopy, actualPath, linkageValue)
              }
            }
          }
        }
      })
    })

    return fieldCopy
  })

  return parsedFields
}

const isMax = computed(() => {
  return list.value.length >= props.maxLines
})

const isMin = computed(() => {
  return list.value.length <= props.minLines
})

const handleAddItem = () => {
  if (isMax.value) {
    return
  }

  const newItem = props.getNewItem?.(list.value.length + 1) || {}

  list.value = [...list.value, newItem]
}

const handleReduceItem = (index: number) => {
  const newData = list.value.filter((v, i) => i !== index)
  list.value = newData
}

const formatter = (row: any, column: TableColumnCtx<any>, cellValue: any, index: number) => {
  const colIndex = column.no
  const field = parseFields(index)[colIndex]

  return h(FormItem, {
    ...field,
    labelWidth: 0,
    label: '',
    style: { marginBottom: 0 },
    name: `${props.name}.${index}.${field.name}`
  })
}

// 追踪当前操作的行索引
watch(
  list,
  (newVal) => {
    // 通过对比快照来找到真正变化的索引
    const changeIndex = newVal.reduce((acc, cur, index) => {
      const oldItem = listSnapshot.value[index]
      if (!isEqual(cur, oldItem)) {
        acc = index
      }
      return acc
    }, 0)

    cIndex.value = changeIndex

    // 更新快照(深拷贝)
    listSnapshot.value = JSON.parse(JSON.stringify(newVal))
  },
  { deep: true }
)

onMounted(() => {
  if (props.minLines && !list.value?.length) {
    list.value = Array.from({ length: props.minLines }, () => ({}))
  }
})

provide(
  '$objGroupBase',
  computed(() => `${props.name}.${cIndex.value}`)
)
</script>

<style lang="scss">
@import '@/style';

@include ns('formList') {
  position: relative;
  width: 100%;
  .list-item {
    margin-bottom: 10px;
    .list-item-content {
      display: flex;
    }
  }
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
  .list-btn {
    margin-left: 10px;
  }
  .list-btn.addBtn {
    margin-left: 0;
  }

  .card-list-container {
    @include ns('form-item') {
      margin-bottom: 18px;
    }
  }

  .table-list-design {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid $borderColor;
    @include ns('form-item') {
      margin-bottom: 18px;
    }
  }

  .table-list-render {
    @include ns('form-item') {
      margin-bottom: 0;
    }
  }
}
</style>
