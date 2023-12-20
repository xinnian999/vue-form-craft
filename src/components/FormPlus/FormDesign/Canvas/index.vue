<template>
  <el-form
    class="canvas"
    :style="`max-width: ${schema.formWidth}`"
    :label-position="schema.labelAlign"
    :size="schema.size"
  >
    <div class="tip" v-if="!list.length">
      <div class="ico">
        <el-icon>
          <Plus />
        </el-icon>
      </div>
      <div class="text">请从左侧拖拽字段来组成表单</div>
    </div>

    <draggable
      style="height: 100%"
      :list="list"
      :group="{ name: 'form', pull: true, put: true }"
      itemKey="name"
      chooseClass="choose"
      ghost-class="ghost"
      @add="handleAdd"
      drag-class="drag"
      fallback-class="fallback"
      handle=".canvas-move"
    >
      <template #item="{ element, index }">
        <CanvasRender :element="element" :index="index" />
      </template>
    </draggable>
  </el-form>
</template>

<script setup lang="jsx">
import { computed, provide, inject, ref } from "vue";
import draggable from "vuedraggable";
import { Plus } from "@element-plus/icons-vue";
import { changeItems } from "../../utils";
import CanvasRender from "./CanvasRender.vue";

const schema = inject("$schema");

const current = inject("$current");

const hoverId = ref("");

provide("hoverId", hoverId);

const list = computed({
  get() {
    return schema.items;
  },
  set(value) {
    Object.assign(schema, { items: value });
  },
});

const handleAdd = () => {
  list.value = changeItems(list.value);
};

const filterId = (items, elementId) => {
  const data = items.filter((item) => {
    return item.onlyId !== elementId;
  });

  return data.map((item) => {
    if (item.children) {
      return {
        ...item,
        children: filterId(item.children, elementId),
      };
    }
    return item;
  });
};

const handleDelete = (element) => {
  list.value = filterId(list.value, element.onlyId);
};

const handleSelect = (element) => {
  current.value = element;
};

provide("handleAdd", handleAdd);
provide("handleSelect", handleSelect);
provide("handleDelete", handleDelete);
</script>

<style lang="less">
.canvas {
  flex: 1;
  padding: 20px;
  border: 1px dashed #999;
  position: relative;
  .tip {
    color: #999;
    font-size: 18px;
    width: 100%;
    text-align: center;
    position: absolute;
    left: 0;
    top: 40%;
    transform: translateY(-50%);
    .ico {
      font-size: 30px;
      margin-bottom: 15px;
    }
  }

  .ghost {
    border-top: 2px solid var(--el-color-primary);
    list-style: none;
  }
}
</style>
