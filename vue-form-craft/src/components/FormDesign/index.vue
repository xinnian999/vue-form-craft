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
import { computed, provide, reactive, ref, toRefs, useTemplateRef, watch } from 'vue'
import { $designInstance } from '@/symbol'
import type {
  DesignInstance,
  FormDesignProps,
  FormElement,
  FormItemType,
  FormSchema
} from '@/types'
import { getCurrentByKey, ns, setCurrentByKey } from '@/utils'
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

const updateSchema = (newSchema: FormSchema, isUpdateHistory = true) => {
  jsonSchema.value = newSchema

  // 本次更新是否需要记录到历史中
  if (isUpdateHistory) {
    // 如果改动了回退的某次记录，将从此开始重新记录
    if (historyIndex.value < history.value.length - 1) {
      history.value = history.value.slice(0, historyIndex.value + 1)
    }
    history.value.push(cloneDeep(newSchema))
    historyIndex.value = history.value.length - 1
  }
}

const current = computed({
  get() {
    return getCurrentByKey(jsonSchema.value.items, currentKey.value)
  },
  set(element: FormItemType) {
    currentKey.value = element.designKey!
    updateSchema(
      { ...jsonSchema.value, items: setCurrentByKey(jsonSchema.value.items, element) },
      false
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
  updateCurrent(newCurrent) {
    instance.current = newCurrent
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
