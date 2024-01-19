<template>
  <div class="CanvasGroup">
    <el-card v-if="component === 'card'" :header="label">
      <DraggableBox />
    </el-card>

    <div v-if="['formList', 'itemGroup', 'inline', 'grid'].includes(component)" class="default">
      <div class="title">【{{ elements[component].name }}】 {{ label }} {{ name }}</div>
      <DraggableBox />
    </div>
  </div>
</template>

<script setup lang="jsx">
import { computed, defineProps, inject } from 'vue'
import Draggable from 'vuedraggable-es'
import { ElCard } from 'element-plus'
import CanvasRender from './CanvasRender.vue'
import * as elements from '../elements'

const thisProps = defineProps({
  label: String,
  name: String,
  component: String,
  required: Boolean,
  modelValue: null,
  initialValue: null,
  children: Array,
  componentName: String,
  props: { type: Object, default: () => ({}) }
})

const handleAdd = inject('handleAdd')

const DraggableBox = computed(() => (
  <Draggable
    list={thisProps.children}
    group="form"
    itemKey="name"
    chosenClass="active"
    ghost-class="ghost"
    class={`childContainer ${thisProps.component}`}
    animation={300}
    onAdd={handleAdd}
  >
    {{
      item: ({ element: child, index }) => <CanvasRender element={child} index={index} />
    }}
  </Draggable>
))

const gridColCount = computed(() => thisProps.props?.colCount)
const gridColSpace = computed(() => thisProps.props?.space + 'px')
const inlineAutoWrap = computed(() => (thisProps.props?.autoWrap ? 'wrap' : 'nowrap'))
</script>

<style scoped lang="less">
.CanvasGroup {
  margin-bottom: 10px;
  .default {
    border: 2px dashed var(--el-color-primary);
    margin: 10px;
    position: relative;
    .title {
      position: absolute;
      left: 0;
      top: -20px;
      padding: 1px 5px;
      background-color: var(--el-color-primary);
      font-size: 12px;
      color: #fff;
    }
  }
}

.childContainer {
  min-height: 150px;
}
.grid {
  display: grid;
  width: 100%;
  gap: v-bind(gridColSpace);
  grid-template-columns: repeat(v-bind(gridColCount), 1fr);
}

.inline {
  display: flex;
  overflow: auto;
  flex-wrap: v-bind(inlineAutoWrap);
}
</style>
