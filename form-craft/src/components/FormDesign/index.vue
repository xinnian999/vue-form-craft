<template>
  <div :class="ns('form-design')" v-bind="$attrs" ref="formDesignWrapper">
    <SideBar />
    <Main />
    <Json v-model="jsonState.visible" :target="jsonState.target" />
  </div>
</template>

<script lang="ts">
import { initSchema } from '@/config'

let initJsonSchema: FormSchema = initSchema
</script>

<script setup lang="ts">
import { cloneDeep, debounce, isEqual } from 'lodash'
import {
  computed,
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
  FormSchema
} from '@/types'
import { ns, repirJsonSchema } from '@/utils'
import Json from './Json/index.vue'
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

const fullScreen = ref(false)

const history = ref<FormSchema[]>([])

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

// 记录历史。由于容器间相互拖拽会同时触发多次，所以使用防抖
const recordHistory = debounce(async (schema: FormSchema) => {
  if (historyIndex.value < history.value.length - 1) {
    // 如果改动的是历史，将截断之后的记录
    history.value = history.value.slice(0, historyIndex.value + 1)
  }
  history.value.push(cloneDeep(schema))
  historyIndex.value = history.value.length - 1
}, 100)

const handleHistoryBack = () => {
  if (historyIndex.value > -1) {
    historyIndex.value--
    const newSchema = history.value[historyIndex.value]
      ? history.value[historyIndex.value]
      : initJsonSchema
    setSchema(cloneDeep(newSchema))
  }
}

const handleHistoryForward = () => {
  if (historyIndex.value < history.value.length - 1) {
    historyIndex.value++
    setSchema(cloneDeep(history.value[historyIndex.value]))
  }
}

// 监听全屏状态变化，同步fullScreen状态
const handleFullscreenChange = () => {
  fullScreen.value = !!document.fullscreenElement
}

// 提交一次修改schema。会序列化schema并记录历史。适合不频繁更新的场景
const applySchema: DesignInstance['applySchema'] = (schema = getSchema()) => {
  const newSchema = repirJsonSchema(schema)
  setSchema(newSchema)

  recordHistory(newSchema)
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

const updateNodeByKey = (designKey: string, newNodeData: Record<string, any>) => {
  const schema = getSchema()

  let oldNode: FormSchema | FormItemType | null = null

  if (designKey === 'root') {
    oldNode = schema
  } else {
    oldNode = getNode(schema.items!, designKey)
  }

  if (oldNode) {
    // TODO: 这里直接修改了getSchema，违反了setSchema唯一修改的原则。待优化
    if (designKey === 'root') {
      Object.assign(schema, { items: newNodeData.children })
    } else {
      Object.assign(oldNode, newNodeData)
    }
    recordHistory(schema)
  }
}

const addItem = (item: FormItemType) => {
  const schema = getSchema()

  applySchema({
    ...schema,
    items: schema.items ? [...schema.items, item] : [item]
  })
}

const current = computed({
  get() {
    if (currentKey.value === 'root') {
      return getSchema()
    }

    return getNodeByKey(currentKey.value)
  },
  set(element: FormItemType) {
    if (currentKey.value === 'root') {
      setSchema(element)
      return
    }

    const oldNode = getNodeByKey(currentKey.value)
    if (oldNode) {
      Object.assign(oldNode, element)
      setSchema(getSchema())
    }
  }
})

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
  hoverKey: '',
  current,
  rightTab: 'form',
  fullScreen,
  history,
  historyIndex,
  getSchema,
  setSchema,
  applySchema,
  updateCurrent(element) {
    current.value = element
  },
  updateCurrentKey(key) {
    currentKey.value = key
  },
  updateHoverKey(key) {
    instance.hoverKey = key
  },
  handleEmit: (name, params) => {
    emits(name, params)
  },
  handleClear: () => {
    applySchema({ ...getSchema(), items: [] })
  },
  handleHistoryBack,
  handleHistoryForward,
  handleToggleFullScreen() {
    fullScreen.value = !fullScreen.value
  },
  getNodeByKey,
  updateNodeByKey,
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

// watch(
//   () => history.value,
//   () => {
//     console.log(history.value)
//   },
//   { deep: true }
// )
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
