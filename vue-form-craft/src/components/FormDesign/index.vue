<template>
  <div :class="ns('form-design')" v-bind="$attrs">
    <Left />
    <Center />
    <Right />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, reactive, ref, toRefs, watch } from 'vue'
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
import { cloneDeep, isEqual } from 'lodash'

const props = withDefaults(defineProps<FormDesignProps>(), {
  omitMenus: () => [],
  schemaContext: () => ({})
})

const emits = defineEmits<{
  save: []
  add: [element: FormElement]
}>()

const currentKey = ref('')

const currentSchema = defineModel<FormSchema>({
  default: reactive({
    labelWidth: 150,
    labelAlign: 'right',
    scrollToError: true,
    size: 'default',
    submitBtn: true,
    items: []
  })
})

const history = ref<FormSchema[]>([])

const historyIndex = ref(0)

const updateHistory = (schema: FormSchema) => {
  history.value.push(schema)
  historyIndex.value = history.value.length - 1
}

const handleHistoryBack = () => {
  if (historyIndex.value > 0) {
    historyIndex.value--
    currentSchema.value = history.value[historyIndex.value]
  }
}

const handleHistoryForward = () => {
  if (historyIndex.value < history.value.length - 1) {
    historyIndex.value++
    currentSchema.value = history.value[historyIndex.value]
  }
}

const updateSchema = (newSchema: FormSchema) => {
  currentSchema.value = newSchema
  updateHistory(cloneDeep(newSchema))
  // updateHistory(newSchema)
}

const list = computed({
  get() {
    return currentSchema.value.items
  },
  set(value) {
    updateSchema({
      ...currentSchema.value,
      items: value
    })
  }
})

const current = computed({
  get() {
    return getCurrentByKey(list.value, currentKey.value)
  },
  set(element: FormItemType) {
    if (isEqual(getCurrentByKey(list.value, currentKey.value), element)) {
      return
    }
    currentKey.value = element.designKey!
    list.value = setCurrentByKey(list.value, element)
  }
})

const instance = reactive<DesignInstance>({
  ...toRefs(props),
  currentKey,
  hoverKey: '',
  schema: currentSchema,
  current,
  list,
  rightTab: 'form',
  history,
  historyIndex,
  updateCurrent(newCurrent) {
    instance.current = newCurrent
  },
  updateHoverKey(key) {
    instance.hoverKey = key
  },
  updateSchema,
  handleEmit: (name, params) => {
    emits(name, params)
  },
  handleHistoryBack,
  handleHistoryForward
})

provide($designInstance, instance)

// watch(
//   history,
//   (newValue) => {
//     console.log(newValue)
//   },
//   { deep: true }
// )
</script>
