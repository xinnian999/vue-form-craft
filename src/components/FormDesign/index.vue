<template>
  <div id="FormDesign" v-bind="$attrs">
    <div class="formItemList">
      <Menus :templates="templates" :omitMenus="omitMenus" />
    </div>

    <div class="formRender">
      <Actions :schemaContext="schemaContext" />
      <Canvas />
    </div>

    <div class="formItemOptions">
      <Current />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, computed } from 'vue'
import { recursionDelete } from '@vue-form-craft/utils'
import Menus from './Menus/index.vue'
import Canvas from './Canvas/index.vue'
import Current from './Current/index.vue'
import Actions from './Actions/index.vue'
import { getCurrentByKey, setCurrentByKey, changeItems, copyItems } from './utils'
import { $schema, $current, $methods, $hoverKey } from '@vue-form-craft/config/symbol'
import type {
  FormSchema,
  FormItemType,
  TemplateData,
  FormElement
} from '@vue-form-craft/config/commonType'

withDefaults(
  defineProps<{
    schemaContext?: Record<string, any>
    templates?: TemplateData
    omitMenus?: string[]
  }>(),
  {
    schemaContext: () => ({})
  }
)

const emit = defineEmits<{
  onSave: []
  save: []
  add: [element: FormElement]
}>()

const currentKey = ref('')

const hoverKey = ref<string>('')

const currentSchema = defineModel<FormSchema>({
  default: () => ({
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
    currentSchema.value = { ...currentSchema.value, items: value }
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

provide($schema, {
  schema: currentSchema,
  updateSchema: (schema) => {
    currentSchema.value = schema
  }
})
provide($current, { current, updateCurrent: (data) => (current.value = data) })
provide($hoverKey, { hoverKey, updateHoverKey: (key: string) => (hoverKey.value = key) })
provide($methods, {
  onAdd: (params) => {
    list.value = changeItems(list.value)
    emit('add', params.item.__draggable_context.element)
  },
  handleDeleteItem: (element) => {
    list.value = recursionDelete(list.value, (item) => item.designKey !== element.designKey)
  },
  handleCopyItem: (element) => {
    list.value = copyItems(list.value, element.designKey!)
  },
  handleSave: () => {
    emit('onSave')
    emit('save')
  }
})
</script>

<style lang="less">
#FormDesign {
  display: flex;
  height: 100%;
  box-sizing: border-box;
  background-color: var(--el-bg-color);
  .formItemList {
    width: 18%;
    padding: 10px;
    position: relative;
    overflow: auto;
  }
  .formRender {
    flex: 1;
    margin: 0 10px;
    overflow: hidden;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
  }
  .formItemOptions {
    width: 22%;
    min-width: 300px;
    overflow: auto;
    padding: 20px;
  }

  .editor {
    height: 70vh;
  }
}

::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 7px;
  /*高宽分别对应横竖滚动条的尺寸*/
  background-color: #fff;
  // position: fixed;
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
</style>
