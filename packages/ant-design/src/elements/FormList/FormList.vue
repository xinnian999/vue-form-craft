<template>
  <div class="fm-formList">
    <CanvasGroup v-if="formInstance.design" :list="children" class="layoutRender" />

    <div v-else>
      <template v-if="mode === 'inline'">
        <a-form-item v-for="(item, index) in list" :key="item.key" class="list-item">
          <div class="list-item-content">
            <a-space>
              <form-item
                v-for="field in parseFields(index)"
                v-bind="field"
                :key="field.label"
                :name="`${name}.${index}.${field.name}`"
                hideLabel
              />
            </a-space>

            <a-button
              v-if="allowReduce && !isMin"
              @click="handleReduceItem(index)"
              circle
              type="primary"
              class="list-btn reduceBtn"
              :disabled="disabled"
              size="small"
            >
              <template #icon> <Icon name="reduce" color="#fff" /> </template
            ></a-button>
          </div>
        </a-form-item>
      </template>

      <template v-if="mode === 'card'">
        <a-card v-for="(item, index) in list" :key="item.key" class="list-card">
          <template #header>
            <div class="card-header">
              <span>{{ title + (index + 1) }}</span>
              <a-button
                v-if="allowReduce && !isMin"
                @click="handleReduceItem(index)"
                circle
                type="primary"
                class="list-btn reduceBtn"
                :disabled="disabled"
                size="small"
              >
                <template #icon> <Icon name="reduce" color="#fff" /> </template>
              </a-button>
            </div>
          </template>
          <form-item
            v-for="field in parseFields(index)"
            v-bind="field"
            :key="field.label"
            class="list-card-item"
            :name="`${name}.${index}.${field.name}`"
          />
        </a-card>
      </template>

      <div style="margin-top: 5px">
        <a-button
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
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FormItem } from '@/components'
import type { TableColumnCtx } from 'element-plus'
import { isEqual, isString } from 'lodash'
import { computed, h, onMounted, provide, ref, watch } from 'vue'
import { CanvasGroup, deepParse, Icon, useFormInstance } from '@vue-form-craft/core'
import type { FormItemType } from '@vue-form-craft/core'

interface Props {
  children: FormItemType[]
  allowAdd?: boolean
  allowReduce?: boolean
  minLines?: number
  maxLines?: number
  mode?: 'table' | 'card' | 'inline'
  title?: string
  name?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  children: () => [],
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

const formInstance = useFormInstance()

const parseFields = (index: number) =>
  deepParse(props.children, { $item: list.value[index], $index: index })

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
    style: { marginBottom: 0 },
    name: `${props.name}.${index}.${field.name}`
  })
}

// formList 值联动
watch(list, (newVal, oldVal) => {
  const changeIndex = newVal.reduce((acc, cur, index) => {
    if (!isEqual(cur, oldVal[index])) {
      acc = index
    }

    return acc
  }, 0)

  cIndex.value = changeIndex

  if (!props.children.some((item) => item.change)) return

  const fields = parseFields(changeIndex)

  const newChangeData = newVal[changeIndex] || {}
  const oldChangeData = oldVal[changeIndex] || {}

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
.fm-formList {
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
    border: 2px dashed var(--a-color-primary);
    padding: 5px;
  }
}
</style>
