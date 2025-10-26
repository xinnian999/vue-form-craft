<template>
  <div :class="ns('form-design')" v-bind="$attrs" ref="formDesignWrapper">
    <Left />
    <Center />
    <Right />
  </div>
</template>

<script lang="ts">
let initJsonSchema: FormSchema = {
  labelWidth: 150,
  labelAlign: 'right',
  scrollToError: true,
  size: 'default',
  submitBtn: true,
  items: []
}

const emptyJsonSchema: FormSchema = cloneDeep(initJsonSchema)
</script>

<script setup lang="ts">
import { cloneDeep, isEqual } from 'lodash'
import {
  computed,
  nextTick,
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
const getSchemaClone = () => cloneDeep(modelValue.value)

const setSchema = (schema: FormSchema) => {
  modelValue.value = schema
}

// 记录历史
const recordHistory = async () => {
  await nextTick()
  const newSchema = getSchemaClone()
  if (historyIndex.value < history.value.length - 1) {
    // 如果改动的是历史，将截断之后的记录
    history.value = history.value.slice(0, historyIndex.value + 1)
  }
  history.value.push(newSchema)
  historyIndex.value = history.value.length - 1
}

const handleHistoryBack = () => {
  if (historyIndex.value > -1) {
    historyIndex.value--
    const newSchema = history.value[historyIndex.value]
      ? history.value[historyIndex.value]
      : initJsonSchema
    setSchema(newSchema)
  }
}

const handleHistoryForward = () => {
  if (historyIndex.value < history.value.length - 1) {
    historyIndex.value++
    setSchema(history.value[historyIndex.value])
  }
}

// 监听全屏状态变化，同步fullScreen状态
const handleFullscreenChange = () => {
  fullScreen.value = !!document.fullscreenElement
}

// 提交一次修改schema。会序列化schema并记录历史。适合不频繁更新的场景
const applySchema: DesignInstance['applySchema'] = (schema = getSchema()) => {
  setSchema(repirJsonSchema(schema))

  recordHistory()
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

  return getNode(schema.items, designKey)
}

const updateNodeByKey = (designKey: string, newNodeData: Record<string, any>) => {
  const schema = getSchemaClone()

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
  // 如果jsonSchema和initJsonSchema不相等,说明传入了v-model
  if (!isEqual(getSchema(), initJsonSchema)) {
    initJsonSchema = getSchemaClone() // 重新设置initJsonSchema
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
  schema: modelValue,
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
  handleResetSchema: () => {
    applySchema(emptyJsonSchema)
  },
  handleHistoryBack,
  handleHistoryForward,
  handleToggleFullScreen() {
    fullScreen.value = !fullScreen.value
  },
  getNodeByKey,
  updateNodeByKey,
  recordHistory
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
