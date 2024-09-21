<template>
  <div id="formList">
    <DefaultCanvasWrapper v-if="design" :children="children" title="自增容器" :name="name" />

    <div v-else>
      <template v-if="mode === 'inline'">
        <el-form-item v-for="(item, index) in list" :key="item.key" class="list-item">
          <div class="list-item-content">
            <el-space>
              <form-item
                v-for="field in fields(index)"
                v-bind="field"
                :key="field.label"
                :name="`${name}.${index}.${field.name}`"
                hideLabel
              />
            </el-space>

            <el-button
              v-if="allowReduce"
              @click="handleReduceItem(index)"
              circle
              type="primary"
              class="list-btn"
              :disabled="disabled"
            >
              <template #icon> <icon-render name="reduce" color="#fff" /> </template
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
                v-if="allowReduce"
                @click="handleReduceItem(index)"
                circle
                type="primary"
                class="list-btn"
                :disabled="disabled"
              >
                <template #icon> <icon-render name="reduce" color="#fff" /> </template>
              </el-button>
            </div>
          </template>
          <form-item
            v-for="field in fields(index)"
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
          v-for="item in children"
          v-bind="item"
          :formatter="(row, _, __, index) => formatter(item, row, index)"
        />
        <el-table-column fixed="right" min-width="60">
          <template #default="record">
            <el-button
              v-if="allowReduce"
              @click="handleReduceItem(record.$index)"
              circle
              type="primary"
              class="list-btn"
              :disabled="disabled"
            >
              <template #icon> <icon-render name="reduce" color="#fff" /> </template
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <div>
        <el-button
          v-if="allowAdd && !isMax"
          @click="handleAddItem"
          circle
          type="primary"
          class="list-btn addBtn"
          :disabled="disabled"
        >
          <template #icon> <icon-render name="add" color="#fff" /></template>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineModel, h, watch } from 'vue'
import { ElFormItem, ElSpace, ElButton, ElCard, ElTableColumn, ElTable } from 'element-plus'
import { FormItem, DefaultCanvasWrapper, IconRender } from '@/components'
import { deepParse } from '@/utils'
import type { FormItemType } from '@/release'
import { isEqual, isString } from 'lodash'

interface Props {
  children: FormItemType[]
  allowAdd?: boolean
  allowReduce?: boolean
  maxLines?: number
  mode?: 'table' | 'card' | 'inline'
  title?: string
  newItemDefaults?: (index: number) => Record<string, any>
  name?: string
  design?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  children: () => [],
  allowAdd: true,
  allowReduce: true,
  maxLines: 999,
  mode: 'table',
  title: '卡片',
  newItemDefaults: () => ({}),
  name: ''
})

const list = defineModel<Record<string, any>[]>({ default: [] })

const fields = computed(
  () => (index: number) => deepParse(props.children, { $item: list.value[index], $index: index })
)

const isMax = computed(() => {
  return list.value.length >= props.maxLines
})

const handleAddItem = () => {
  if (isMax.value) {
    return
  }
  list.value = [...list.value, props.newItemDefaults(list.value.length)]
}

const handleReduceItem = (index: number) => {
  const newData = list.value.filter((v, i) => i !== index)
  list.value = newData
}

const formatter = (item: FormItemType, data: Record<string, any>, index: number) => {
  return h(FormItem, {
    ...deepParse(item, { $item: list.value[index], $index: index }),
    hideLabel: true,
    style: { marginBottom: 0 },
    name: `${props.name}.${index}.${item.name}`
  })
}

// formList 值联动
watch(list, (newVal, oldVal) => {
  if (!props.children.some((item) => item.change)) return

  const changeIndex = newVal.reduce((acc, cur, index) => {
    if (!isEqual(cur, oldVal[index])) {
      acc = index
    }

    return acc
  }, 0)

  const fields = deepParse(props.children, { $item: newVal[changeIndex], $index: changeIndex })

  const newChangeData = newVal[changeIndex]
  const oldChangeData = oldVal[changeIndex]

  fields.forEach((item: FormItemType) => {
    if (
      item.change &&
      oldChangeData &&
      !isEqual(newChangeData[item.name], oldChangeData[item.name])
    ) {
      item.change.forEach((v) => {
        if (v.condition !== false) {
          if (isString(v.condition) && /^{{\s*(.*?)\s*}}$/.test(v.condition)) return

          const name = v.target.split('.').pop()!
          list.value[changeIndex][name] = v.value
        }
      })
    }
  })
})
</script>

<style lang="less">
#formList {
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
}
</style>
