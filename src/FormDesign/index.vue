<template>
  <div id="formDesign" :class="props.class" :style="style">
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

<script setup lang="jsx">
import {
  ref,
  provide,
  reactive,
  onMounted,
  inject,
  computed,
  defineProps,
  defineEmits,
  defineOptions
} from 'vue'
import Menus from './Menus/index.vue'
import Canvas from './Canvas/index.vue'
import Current from './Current/index.vue'
import Actions from './Actions.vue'

defineOptions({
  name: 'FormDesign'
})

const props = defineProps({
  modelValue: Object,
  schemaId: [String, Number],
  previewSchemaContext: {
    type: Object,
    default: () => ({})
  },
  class: null,
  style: null
})

const emit = defineEmits(['update:modelValue', 'onSave'])

const selectData = reactive({})

const currentId = ref('')

const currentSchema = ref({
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: []
})

const getSchema = inject('$getSchema')

const schema = computed({
  get() {
    return props.modelValue || currentSchema.value
  },
  set(val) {
    emit('update:modelValue', val)
    currentSchema.value = val
  }
})

const current = computed({
  get() {
    const findItem = (items) => {
      return items.reduce((all, item) => {
        if (item.onlyId === currentId.value) {
          return item
        }
        if (item.children) {
          const res = findItem(item.children)
          if (res) return res
        }

        return all
      }, null)
    }
    return findItem(schema.value.items) || {}
  },
  set(element) {
    currentId.value = element.onlyId
    const set = (items) => {
      return items.map((item) => {
        if (item.onlyId === element.onlyId) {
          return item
        }
        if (item.children) {
          return { ...item, children: set(item.children) }
        }
        return item
      })
    }

    schema.value = { ...schema.value, items: set(schema.value.items) }
  }
})

onMounted(async () => {
  if (props.schemaId && getSchema) {
    const remoteSchema = await getSchema(props.schemaId)
    remoteSchema && (currentSchema.value = remoteSchema)
  }
})

provide('$current', current)
provide('$schema', schema)
provide('$selectData', selectData)

provide('$emit', emit)
</script>

<style lang="less">
#formDesign {
  display: flex;
  height: 100%;
  box-sizing: border-box;

  .formItemList {
    width: 20%;
    padding: 10px;
    background-color: #fff;
    position: relative;
    overflow: auto;
  }
  .formRender {
    flex: 1;
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
    width: 25%;
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
