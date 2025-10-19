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
import { computed, onBeforeMount, provide, reactive, ref, toRefs, useTemplateRef, watch } from 'vue'
import { $designInstance } from '@/symbol'
import type {
  DesignInstance,
  FormDesignProps,
  FormElement,
  FormItemType,
  FormSchema
} from '@/types'
import { getCurrentByKey, ns, repirJsonSchema, setCurrentByElement } from '@/utils'
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

const jsonSchema = defineModel<FormSchema>({
  default: () => reactive(initJsonSchema)
})

const currentKey = ref('')

const fullScreen = ref(false)

const history = ref<FormSchema[]>([])

const historyIndex = ref(-1)

/**
 * 更新表单schema唯一方法
 *
 * 注意：外部如果想要记录历史，应该通过ref调用此方法，而不是直接修改v-model
 * 例如：formDesignRef.value.updateSchema(newSchema)
 */
const updateSchema: DesignInstance['updateSchema'] = (
  schema = jsonSchema.value,
  { saveHistory = true, repir = true } = {}
) => {
  let newSchema = cloneDeep(schema)

  // 是否序列化schema
  if (repir) {
    newSchema = repirJsonSchema(schema)
  }

  // 本次更新是否记录历史
  if (saveHistory) {
    if (historyIndex.value < history.value.length - 1) {
      // 如果改动的是历史，将截断之后的记录
      history.value = history.value.slice(0, historyIndex.value + 1)
    }
    history.value.push(newSchema)
    historyIndex.value = history.value.length - 1
  }

  jsonSchema.value = newSchema
}

const handleHistoryBack = () => {
  if (historyIndex.value > -1) {
    historyIndex.value--
    const newSchema = history.value[historyIndex.value]
      ? history.value[historyIndex.value]
      : initJsonSchema
    updateSchema(newSchema, { saveHistory: false, repir: false })
  }
}

const handleHistoryForward = () => {
  if (historyIndex.value < history.value.length - 1) {
    historyIndex.value++
    updateSchema(history.value[historyIndex.value], { saveHistory: false, repir: false })
  }
}

const current = computed({
  get() {
    return getCurrentByKey(jsonSchema.value.items, currentKey.value)
  },
  set(element: FormItemType) {
    updateSchema(
      {
        ...jsonSchema.value,
        items: setCurrentByElement(jsonSchema.value.items, element)
      },
      {
        saveHistory: false,
        repir: false
      }
    )
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
  if (!isEqual(jsonSchema.value, initJsonSchema)) {
    const schema = repirJsonSchema(jsonSchema.value) // 序列化
    initJsonSchema = cloneDeep(schema) // 重新设置initJsonSchema
    jsonSchema.value = schema
  }
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
    updateSchema(emptyJsonSchema)
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
