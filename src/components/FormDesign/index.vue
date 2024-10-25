<template>
  <div :class="namespace('form-design')" v-bind="$attrs">
    <Menus />

    <Center />

    <Current />
  </div>
</template>

<script setup lang="ts">
import { ref, provide, computed, reactive, toRefs } from 'vue'
import { namespace, recursionDelete } from '@vue-form-craft/utils'
import Menus from './Menus/index.vue'
import Center from './Center/index.vue'
import Current from './Current/index.vue'
import { getCurrentByKey, setCurrentByKey, changeItems, copyItems } from '@vue-form-craft/utils'
import { $designInstance } from '@vue-form-craft/config/symbol'
import type {
  FormSchema,
  FormItemType,
  FormElement,
  FormDesignProps
} from '@vue-form-craft/config/commonType'
import templateMock from '@vue-form-craft/template'

const props = withDefaults(defineProps<FormDesignProps>(), {
  templates: () => templateMock,
  omitMenus: () => [],
  schemaContext: () => ({})
})

const emit = defineEmits<{
  onSave: []
  save: []
  add: [element: FormElement]
}>()

const currentKey = ref('')

const hoverKey = ref('')

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
    list.value = setCurrentByKey(currentSchema.value.items, element)
  }
})

const instance = reactive({
  ...toRefs(props),
  currentKey,
  hoverKey,
  schema: currentSchema,
  current,
  list,
  updateCurrent: (data: FormItemType) => (current.value = data),
  updateHoverKey: (key: string) => (hoverKey.value = key),
  updateSchema: (schema: FormSchema) => {
    currentSchema.value = schema
  },
  onAdd: (params: Record<string, any>) => {
    list.value = changeItems(list.value)
    emit('add', params.item.__draggable_context.element)
  },
  handleDeleteItem: (element: FormItemType) => {
    list.value = recursionDelete(list.value, (item) => item.designKey !== element.designKey)
  },
  handleCopyItem: (element: FormItemType) => {
    list.value = copyItems(list.value, element.designKey!)
  },
  handleSave: () => {
    emit('onSave')
    emit('save')
  }
})

provide($designInstance, instance)
</script>
