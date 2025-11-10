<template>
  <div class="vfc-formList">
    <CanvasGroup v-if="formInstance.design" v-model="fields" class="layoutRender" />

    <div v-else>
      <template v-if="mode === 'inline'">
        <el-form-item v-for="(item, index) in list" :key="item.key" class="list-item">
          <div class="list-item-content">
            <el-space>
              <form-item
                v-for="field in parseFields(index)"
                v-bind="field"
                :key="field.label"
                :name="`${name}.${index}.${field.name}`"
                hideLabel
              />
            </el-space>

            <el-button
              v-if="allowReduce && !isMin"
              @click="handleReduceItem(index)"
              circle
              type="primary"
              class="list-btn reduceBtn"
              :disabled="disabled"
              size="small"
            >
              <template #icon> <Icon name="reduce" color="#fff" /> </template
            ></el-button>
          </div>
        </el-form-item>
      </template>

      <template v-if="mode === 'card'">
        <el-card v-for="(item, index) in list" :key="item.key" class="list-card">
          <template #header>
            <div class="card-header">
              <span>{{ title + (index + 1) }}</span>
              <el-button
                v-if="allowReduce && !isMin"
                @click="handleReduceItem(index)"
                circle
                type="primary"
                class="list-btn reduceBtn"
                :disabled="disabled"
                size="small"
              >
                <template #icon> <Icon name="reduce" color="#fff" /> </template>
              </el-button>
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

      <el-table v-if="mode === 'table' && list.length" :data="list" style="width: 100%">
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
            <el-button
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
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-top: 5px">
        <el-button
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
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TableColumnCtx } from 'element-plus'
import { isEqual, pickBy } from 'lodash'
import { computed, h, onMounted, provide, ref, watch } from 'vue'
import { CanvasGroup, FormItem } from '@/components'
import { useChildrenModel, useFormInstance } from '@/hooks'
import Icon from '@/Icon/index.vue'
import type { FormItemType } from '@/types'
import { deepParse } from '@/utils'

interface Props {
  allowAdd?: boolean
  allowReduce?: boolean
  minLines?: number
  maxLines?: number
  mode?: 'table' | 'card' | 'inline'
  title?: string
  name?: string
  disabled?: boolean
  designKey?: string
  children?: FormItemType[]
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

const fields = useChildrenModel(props)

const parseFields = (index: number) =>
  deepParse(fields.value, { $item: list.value[index], $index: index })

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
  list.value = [...list.value, {}]
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
    hideLabel: true,
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
.vfc-formList {
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

  .layoutRender {
    padding: 5px;
    background-color: #f4f3f3;
    border-radius: 5px;
  }
}
</style>
