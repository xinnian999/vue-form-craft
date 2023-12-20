<template>
  <div
    :class="canvasItemClass"
    @click.stop="handleSelect(element)"
    @mousemove.stop="handleHoverEnter"
    @mouseleave.stop="handleHoverLeave"
  >
    <div class="actions-left-top" v-if="element.onlyId === current.onlyId">
      <el-button
        class="canvas-move"
        :icon="Pointer"
        size="small"
        type="primary"
      ></el-button>
    </div>
    <div class="actions-right-bottom" v-if="element.onlyId === current.onlyId">
      <el-button
        :icon="Delete"
        size="small"
        type="primary"
        @click.stop="handleDelete(element)"
      ></el-button>
    </div>

    <canvas-group v-if="element.children" v-bind="element" :hidden="false" />

    <form-item
      v-else
      v-bind="element"
      :props="checkProps(element.props)"
      class="form-item-btn"
    />
  </div>
</template>

<script setup lang="jsx">
import { defineProps, inject, computed } from "vue";
import { omit } from "lodash";
import { Delete, Pointer } from "@element-plus/icons-vue";
import CanvasGroup from "./CanvasGroup.vue";
import { FormItem } from "../../components";

const props = defineProps({
  element: Object,
  index: null,
});

const current = inject("$current");

const handleSelect = inject("handleSelect");

const handleDelete = inject("handleDelete");

const hoverId = inject("hoverId");

const canvasItemClass = computed(() => ({
  "canvas-item": true,
  active: props.element.onlyId === current.value.onlyId,
  hover: props.element.onlyId === hoverId.value,
}));

const handleHoverEnter = () => {
  hoverId.value = props.element.onlyId;
};

const handleHoverLeave = () => {
  hoverId.value = "";
};

const checkProps = (props) => {
  return omit(props, ["multiple", "autoSelectedFirst"]);
};
</script>

<style lang="less">
.canvas-item {
  border: 2px solid transparent;
  margin-bottom: 5px;
  padding: 10px;
  position: relative;

  #form-item {
    margin-bottom: 0;
  }

  .actions-left-top {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 20;
    background-color: var(--el-color-primary);
  }
  .actions-right-bottom {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 20;
    background-color: var(--el-color-primary);
  }
}

.hover {
  border: 2px solid var(--el-color-primary-light-5);
}

.active {
  border: 2px solid var(--el-color-primary) !important;
  &:hover {
    border: 2px solid var(--el-color-primary) !important;
  }
}
</style>
