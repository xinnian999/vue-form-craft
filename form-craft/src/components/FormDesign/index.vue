<template>
  <div :class="ns('form-design')" v-bind="$attrs" ref="formDesignWrapper">
    <Left />
    <Center />
    <Right />
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
import Center from './Center/index.vue'
import Left from './Left/index.vue'
import Right from './Right/index.vue'
import './styles/index.scss'

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

const currentKey = ref('')

const fullScreen = ref(false)

const history = ref<FormSchema[]>([])

const historyIndex = ref(-1)

const getSchema = () => modelValue.value

// 获取一份不具有响应式的schema
const getSchemaClone = () => cloneDeep(getSchema())

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
    oldNode = getNode(schema.items, designKey)
  }

  if (oldNode) {
    Object.assign(oldNode, newNodeData)
    applySchema(schema)
  }
}

const current = computed({
  get() {
    return getNodeByKey(currentKey.value)
  },
  set(element: FormItemType) {
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
  getSchemaClone,
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
  updateNodeByKey
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
