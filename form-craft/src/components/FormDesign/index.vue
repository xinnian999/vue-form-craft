<template>
  <div :class="ns('form-design')" v-bind="$attrs" ref="formDesignWrapper">
    <Left />
    <Center />
    <Right />
  </div>
</template>

<script lang="ts">
const initJsonSchema: FormSchema = {
  labelWidth: 150,
  labelAlign: 'right',
  scrollToError: true,
  size: 'default',
  submitBtn: true,
  items: []
}
</script>

<script setup lang="ts">
import { cloneDeep } from 'lodash'
import {
  computed,
  onBeforeMount,
  onMounted,
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
import { getCurrentByKey, ns, repirItems, setCurrentByKey } from '@/utils'
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

const currentKey = ref('')

const jsonSchema = defineModel<FormSchema>({
  default: () => reactive(initJsonSchema)
})

const fullScreen = ref(false)

const history = ref<FormSchema[]>([])

const historyIndex = ref(-1)

const handleHistoryBack = () => {
  if (historyIndex.value > -1) {
    historyIndex.value--
    jsonSchema.value = cloneDeep(
      history.value[historyIndex.value] ? history.value[historyIndex.value] : initJsonSchema
    )
  }
}

const handleHistoryForward = () => {
  if (historyIndex.value < history.value.length - 1) {
    historyIndex.value++
    jsonSchema.value = cloneDeep(history.value[historyIndex.value])
  }
}

/**
 * 更新表单schema唯一方法
 *
 * 注意：外部如果想要记录历史，应该通过ref调用此方法，而不是直接修改v-model
 * 例如：formDesignRef.value.updateSchema(newSchema)
 */
const updateSchema = (newSchema: FormSchema) => {
  const parseNewSchema = { ...newSchema, items: repirItems(newSchema.items) }
  jsonSchema.value = parseNewSchema

  // 历史记录处理
  if (historyIndex.value < history.value.length - 1) {
    // 如果改动的是历史，将截断之后的记录
    history.value = history.value.slice(0, historyIndex.value + 1)
  }
  history.value.push(cloneDeep(parseNewSchema))
  historyIndex.value = history.value.length - 1
}

const current = computed({
  get() {
    return getCurrentByKey(jsonSchema.value.items, currentKey.value)
  },
  set(element: FormItemType) {
    currentKey.value = element.designKey!
    jsonSchema.value = {
      ...jsonSchema.value,
      items: setCurrentByKey(jsonSchema.value.items, element)
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
  jsonSchema.value = { ...jsonSchema.value, items: repirItems(jsonSchema.value.items) }
})

const instance = reactive<DesignInstance>({
  ...toRefs(props),
  currentKey,
  hoverKey: '',
  schema: jsonSchema,
  current,
  rightTab: 'form',
  fullScreen,
  history,
  historyIndex,
  updateSchema,
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
    updateSchema(initJsonSchema)
  },
  handleHistoryBack,
  handleHistoryForward,
  handleToggleFullScreen() {
    fullScreen.value = !fullScreen.value
  }
})

provide($designInstance, instance)

defineExpose(instance)
</script>
