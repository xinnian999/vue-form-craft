<template>
  <div :class="ns('form-design')" v-bind="$attrs">
    <Left />
    <Center />
    <Right />
  </div>
</template>

<script setup lang="ts">
import { ref, provide, computed, reactive, toRefs } from 'vue'
import Left from './Left/index.vue'
import Center from './Center/index.vue'
import Right from './Right/index.vue'
import { getCurrentByKey, setCurrentByKey, $designInstance, ns } from '@form-magic/core'
import type {
  FormSchema,
  FormItemType,
  FormDesignProps,
  DesignInstance,
  FormElement
} from '@form-magic/core'

const props = withDefaults(defineProps<FormDesignProps>(), {
  templates: () => [],
  omitMenus: () => [],
  schemaContext: () => ({})
})

const emits = defineEmits<{
  onSave: []
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
    items: []
  })
})

const list = computed({
  get() {
    return currentSchema.value.items
  },
  set(value) {
    currentSchema.value.items = value
  }
})

const current = computed({
  get() {
    return getCurrentByKey(list.value, currentKey.value)
  },
  set(element: FormItemType) {
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
  updateCurrent(newCurrent) {
    instance.current = newCurrent
  },
  updateHoverKey(key) {
    instance.hoverKey = key
  },
  updateSchema: (schema) => {
    Object.assign(currentSchema.value, schema)
  },
  updateList: (newList) => {
    list.value = newList
  },
  handleEmit: (name, params) => {
    emits(name, params)
  }
})

provide($designInstance, instance)
</script>
