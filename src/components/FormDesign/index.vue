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

<script setup lang="jsx">
import { ref, provide, computed, defineProps, defineEmits, defineOptions, watchEffect } from 'vue'
import Menus from './Menus/index.vue'
import Canvas from './Canvas/index.vue'
import Current from './Current/index.vue'
import Actions from './Actions.vue'

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

const currentId = ref('')

const currentSchema = ref({
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: []
})

const current = computed({
  get() {
    const findItem = (items) => {
      return items.reduce((all, item) => {
        if (item.designKey === currentId.value) {
          return item
        }
        if (item.children) {
          const res = findItem(item.children)
          if (res) return res
        }

        return all
      }, null)
    }
    return findItem(currentSchema.value.items) || {}
  },
  set(element) {
    currentId.value = element.designKey
    const set = (items) => {
      return items.map((item) => {
        if (item.designKey === element.designKey) {
          return element
        }
        if (item.children) {
          return { ...item, children: set(item.children) }
        }
        return item
      })
    }
    currentSchema.value = {
      ...currentSchema.value,
      items: set(currentSchema.value.items)
    }
  }
})

watchEffect(() => {
  if (props.schema) {
    currentSchema.value = props.schema
  }
})

provide('$current', current)
provide('$schema', currentSchema)
provide('$emit', emit)
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
