<template>
  <draggable
    :list="children"
    group="formDesign"
    itemKey="name"
    chosenClass="active"
    ghost-class="ghost"
    class="childrenContainer"
    :animation="300"
    :style="style"
    @add="onAdd"
  >
    <template #item="{ element: child }">
      <CanvasRender v-if="child.onlyId" v-bind="child" />
    </template>
  </draggable>
</template>

<script setup lang="jsx">
import { defineProps, inject } from 'vue'
import Draggable from 'vuedraggable-es'
import CanvasRender from './CanvasRender.vue'

defineProps({
  children: Array,
  style: null
})

const onAdd = inject('$onAdd')
</script>

<style scoped lang="less">
.childrenContainer {
  min-height: 150px;
}
</style>
