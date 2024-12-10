<template>
  <div class="vfc-formList">
    <CanvasGroup v-if="formInstance.design" :list="children" class="layoutRender" />

    <div v-else>
      <component :is="contaniners[mode]" :list :fields="children" :name :parseFields>
        <template #reduce="{ index }">
          <ReduceButton :index="index" />
        </template>
      </component>

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
import { computed, defineComponent, h, onMounted, provide, ref, watch } from 'vue'
import { CanvasGroup } from '@vue-form-craft/components'
import { deepParse } from '@vue-form-craft/utils'
import { isEqual, isString } from 'lodash'
import type { FormItemType } from '@vue-form-craft/types'
import { useFormInstance } from '@vue-form-craft/hooks'
import Icon from '@vue-form-craft/icons'
import table from './table.vue'
import card from './card.vue'
import inline from './inline.vue'
import { ElButton } from 'element-plus'

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

const contaniners = {
  table,
  card,
  inline
}

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

const ReduceButton = defineComponent<{ index: number }>({
  props: ['index'],
  render() {
    return h(
      ElButton,
      {
        type: 'primary',
        class: 'list-btn reduceBtn',
        style: {
          display: props.allowReduce && !isMin.value ? 'inline' : 'none'
        },
        circle: true,
        disabled: props.disabled,
        size: 'small',
        onClick: () => handleReduceItem(this.$props.index)
      },
      {
        icon: () => h(Icon, { name: 'reduce' })
      }
    )
  }
})

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
.vfc-formList {
  position: relative;
  width: 100%;

  .list-btn {
    margin-left: 10px;
  }
  .list-btn.addBtn {
    margin-left: 0;
  }

  .layoutRender {
    border: 2px dashed var(--el-color-primary);
    padding: 5px;
  }
}
</style>
