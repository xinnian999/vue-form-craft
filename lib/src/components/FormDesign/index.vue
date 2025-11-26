<template>
  <div :class="ns('form-design')" v-bind="$attrs" ref="formDesignWrapper">
    <SideBar />
    <Main />
  </div>
</template>

<script lang="ts">
import { initSchema } from '@/config'

let initJsonSchema: FormSchema = initSchema
</script>

<script setup lang="ts">
import { cloneDeep, debounce, isEqual } from 'lodash'
import {
  onBeforeMount,
  onBeforeUnmount,
  provide,
  reactive,
  ref,
  toRefs,
  useTemplateRef,
  watch
} from 'vue'
import { $designInstance } from '@/symbol'
import type {
  DesignInstance,
  FormDesignProps,
  FormElement,
  FormItemType,
  FormSchema,
  HistoryRecord
} from '@/types'
import { ns, repirJsonSchema } from '@/utils'
import Main from './Main/index.vue'
import SideBar from './SideBar/index.vue'

const props = withDefaults(defineProps<FormDesignProps>(), {
  omitMenus: () => [],
  schemaContext: () => ({})
})

const emits = defineEmits<{
  save: []
  add: [element: FormElement]
}>()

const formDesignWrapper = useTemplateRef<HTMLDivElement>('formDesignWrapper')

const modelValue = defineModel<FormSchema>({
  default: () => reactive(initJsonSchema)
})

const currentKey = ref('root')

const hoverKey = ref('')

const fullScreen = ref(false)

const history = ref<HistoryRecord[]>([])

const historyIndex = ref(-1)

const getSchema = () => modelValue.value

const jsonState = reactive({
  visible: false,
  target: ''
})

// schema的唯一修改入口
const setSchema = (schema: FormSchema) => {
  modelValue.value = schema
}

const setCurrentKey = (key: string) => {
  currentKey.value = key
}

const setHoverKey = (key: string) => {
  hoverKey.value = key
}

// 记录历史。
const recordHistory = debounce((description: string = '修改') => {
  if (historyIndex.value < history.value.length - 1) {
    // 如果改动的是历史，将截断之后的记录
    history.value = history.value.slice(0, historyIndex.value + 1)
  }
  history.value.push({
    schema: cloneDeep(getSchema()),
    description,
    timestamp: Date.now()
  })
  historyIndex.value = history.value.length - 1
}, 700)

// 防抖记录历史

const handleHistoryBack = () => {
  if (historyIndex.value > -1) {
    historyIndex.value--
    const record = history.value[historyIndex.value]
    const newSchema = record ? record.schema : initJsonSchema
    setSchema(cloneDeep(newSchema))
  }
}

const handleHistoryForward = () => {
  if (historyIndex.value < history.value.length - 1) {
    historyIndex.value++
    setSchema(cloneDeep(history.value[historyIndex.value].schema))
  }
}

// 监听全屏状态变化，同步fullScreen状态
const handleFullscreenChange = () => {
  fullScreen.value = !!document.fullscreenElement
}

const getNode = (items: FormItemType[], designKey: string): FormItemType | null => {
  return items.reduce<FormItemType | null>((acc, cur) => {
    if (cur.designKey === designKey) {
      return cur
    }
    if (cur.children) {
      const res = getNode(cur.children, designKey)
      if (res) return res
    }

    return acc
  }, null)
}

const getNodeByKey = (designKey: string): FormItemType | null => {
  const schema = getSchema()

  if (!schema.items) return null

  return getNode(schema.items, designKey)
}

const addItem = (item: FormItemType) => {
  const schema = getSchema()

  setSchema({
    ...schema,
    items: schema.items ? [...schema.items, item] : [item]
  })
  recordHistory('添加节点')
}

watch(fullScreen, (val) => {
  if (val) {
    formDesignWrapper.value?.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
})

onBeforeMount(() => {
  // 修复初始schema
  let schema = repirJsonSchema(getSchema())
  setSchema(schema)

  // 如果jsonSchema和initJsonSchema不相等,说明传入了v-model
  if (!isEqual(schema, initJsonSchema)) {
    initJsonSchema = cloneDeep(schema) // 重新设置initJsonSchema
  }

  // 监听全屏变化事件
  document.addEventListener('fullscreenchange', handleFullscreenChange)
})

onBeforeUnmount(() => {
  // 清理全屏监听事件
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
})

const instance = reactive<DesignInstance>({
  ...toRefs(props),
  currentKey,
  hoverKey,
  recordHistory,
  fullScreen,
  history,
  historyIndex,
  getSchema,
  setSchema,
  setCurrentKey,
  setHoverKey,
  handleEmit: (name, params) => {
    emits(name, params)
  },
  handleClear: () => {
    setSchema({ ...getSchema(), items: [] })
    setCurrentKey('root')
    recordHistory('清空表单')
  },
  handleHistoryBack,
  handleHistoryForward,
  handleToggleFullScreen() {
    fullScreen.value = !fullScreen.value
  },
  getNodeByKey,
  handleJson(target?: string) {
    setTimeout(() => {
      jsonState.visible = true
      jsonState.target = target || ''
    }, 100)
  },
  addItem
})

provide($designInstance, instance)

defineExpose(instance)
</script>

<style lang="scss">
@import '@/style';

@include ns('form-design') {
  display: flex;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  background-color: $bgColor;
  position: relative;
  flex-direction: row;

  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px;
    /*高宽分别对应横竖滚动条的尺寸*/
    background-color: transparent;
  }

  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: none;
    background: transparent;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    background-color: #ccc;
  }

  &-tabs {
    border: none;
    height: 100%;
    box-sizing: border-box;
    .el-tabs__content {
      padding: 0 !important;
    }
    .el-tab-pane {
      height: 100%;
      overflow-y: auto;
      overflow-x: visible;
      padding: 10px;
      box-sizing: border-box;
    }
  }
}
</style>
