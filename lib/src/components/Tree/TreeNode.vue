<template>
  <div :class="ns('tree-node-wrapper')">
    <div
      :class="[
        ns('tree-node'),
        {
          [ns('tree-node-active')]: isActive,
          [ns('tree-node-is-leaf')]: !hasChildren
        }
      ]"
      :style="{ paddingLeft: `${level * 18 + 8}px` }"
      @click="handleClick"
    >
      <span
        :class="[ns('tree-node-expand-icon'), { expanded: expanded }]"
        v-if="hasChildren"
        @click.stop="toggleExpand"
      >
        <Icon name="arrowDown" />
      </span>

      <div :class="ns('tree-node-content')">
        <slot :node="node" :data="node"></slot>
      </div>
    </div>

    <div v-if="hasChildren" v-show="expanded" :class="ns('tree-node-children')">
      <TreeNode
        v-for="child in node.children"
        :key="child[nodeKey]"
        :node="child"
        :nodeKey="nodeKey"
        :currentKey="currentKey"
        :level="level + 1"
        :defaultExpandAll="defaultExpandAll"
        :expandOnClickNode="expandOnClickNode"
        @node-click="$emit('node-click', $event)"
      >
        <template #default="slotProps">
          <slot name="default" v-bind="slotProps"></slot>
        </template>
      </TreeNode>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Icon } from '@/components'
import { ns } from '@/utils'

const props = defineProps<{
  node: any
  nodeKey: string
  currentKey?: string | number
  level: number
  defaultExpandAll: boolean
  expandOnClickNode: boolean
}>()

const emit = defineEmits(['node-click'])

defineSlots<{
  default(props: { node: any; data: any }): any
}>()

const expanded = ref(props.defaultExpandAll)

const hasChildren = computed(() => {
  return props.node.children && props.node.children.length > 0
})

const isActive = computed(() => {
  return props.currentKey === props.node[props.nodeKey]
})

const toggleExpand = () => {
  if (hasChildren.value) {
    expanded.value = !expanded.value
  }
}

const handleClick = () => {
  if (props.expandOnClickNode && hasChildren.value) {
    toggleExpand()
  }
  emit('node-click', props.node)
}

// 监听 defaultExpandAll 变化
watch(
  () => props.defaultExpandAll,
  (val) => {
    expanded.value = val
  }
)
</script>

<style lang="scss">
@import '@/style';

@include ns('tree-node-wrapper') {
  @include ns('tree-node') {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #606266;
    transition: background-color 0.2s;
    margin-bottom: 2px;
    border-radius: 4px;
    padding: 10px;
    font-size: 14px;

    &:hover {
      background-color: #f5f7fa;
    }

    &-active {
      background-color: #f0f7ff;
      color: var(--el-color-primary);
      font-weight: 500;
    }

    &-expand-icon {
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transform: rotate(-90deg);
      color: #909399;
      transition: transform 0.2s;
      flex-shrink: 0;

      &.expanded {
        transform: rotate(0deg);
      }
    }

    &-content {
      flex: 1;
      display: flex;
      align-items: center;
      overflow: hidden;
    }
  }
}
</style>
