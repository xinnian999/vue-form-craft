<template>
  <draggable
    :list="children"
    group="formDesign"
    itemKey="name"
    chosenClass="active"
    ghost-class="ghost"
    class="childrenContainer"
    :animation="300"
    :style="layoutBoxStyle"
    @add="onAdd"
  >
    <template #item="{ element: child, index }">
      <CanvasRender v-bind="child" :index="index" />
    </template>
  </draggable>
</template>

<script setup lang="jsx">
import { defineProps, inject } from 'vue'
import Draggable from 'vuedraggable-es'
import useStyle from '@/hooks/useStyle'
import CanvasRender from './CanvasRender.vue'

const thisProps = defineProps({
  component: String,
  children: Array,
  props: Object
})

const layoutBoxStyle = useStyle(thisProps.component, thisProps.props)

const onAdd = inject('$onAdd')
</script>

<style scoped lang="less">
.childrenContainer {
  min-height: 150px;
}
</style>
