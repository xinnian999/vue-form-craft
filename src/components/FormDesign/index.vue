<template>
  <div id="formDesign" v-bind="$attrs">
    <div class="formItemList">
      <Menus />
    </div>

    <div class="formRender">
      <Actions :previewSchemaContext="previewSchemaContext" />
      <Canvas />
    </div>

    <div class="formItemOptions">
      <Current />
    </div>
  </div>
</template>

<script setup>
import { ref, provide, computed, defineProps, defineEmits, defineOptions, watchEffect } from 'vue'
import { recursionDelete } from '@/utils'
import Menus from './Menus/index.vue'
import Canvas from './Canvas/index.vue'
import Current from './Current/index.vue'
import Actions from './Actions.vue'
import { getCurrentByKey, setCurrentByKey, changeItems, copyItems } from './utils'
import { $schema, $current, $methods, $hoverKey } from '@/config/symbol'

defineOptions({
  name: 'FormDesign'
})

const props = defineProps({
  schema: Object,
  previewSchemaContext: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['onSave'])

const currentKey = ref('')

const hoverKey = ref(null)

const currentSchema = ref({
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: []
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
    return getCurrentByKey(list.value, currentKey.value) || {}
  },
  set(element) {
    currentKey.value = element.designKey
    list.value = setCurrentByKey(currentSchema.value.items, element)
  }
})

watchEffect(() => {
  if (props.schema) {
    currentSchema.value = props.schema
  }
})

provide($schema, { schema: currentSchema, updateSchema: (json) => (currentSchema.value = json) })
provide($current, { current, updateCurrent: (data) => (current.value = data) })
provide($hoverKey, { hoverKey, updateHoverKey: (key) => (hoverKey.value = key) })
provide($methods, {
  onAdd: () => {
    list.value = changeItems(list.value)
  },
  handleDeleteItem: (element) => {
    list.value = recursionDelete(list.value, (item) => item.designKey !== element.designKey)
  },
  handleCopyItem: (element) => {
    list.value = copyItems(list.value, element.designKey)
  },
  handleSave: () => {
    emit('onSave', currentSchema.value)
  }
})
</script>

<style lang="less">
#formDesign {
  display: flex;
  height: 100%;
  box-sizing: border-box;
  background-color: #eee;
  .formItemList {
    width: 18%;
    padding: 10px;
    background-color: #fff;
    position: relative;
    overflow: auto;
  }
  .formRender {
    flex: 1;
    margin: 0 10px;
    overflow: hidden;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    background-color: #fff;
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
  }
  .formItemOptions {
    width: 20%;
    overflow: auto;
    padding: 20px;
    background-color: #fff;
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
