<template>
  <div class="container" @click="open" :class="{ disabled }">
    <component v-if="modelValue" class="selected" :is="component" :[propKey]="modelValue" />
    <icon-render class="un-selected" v-else name="add" />
  </div>
  <ElDialog v-model="visible" title="图标选择">
    <div class="searchBar" @click="handleSearch">
      <el-input v-model="q" placeholder="输入关键词搜索" @input="handleSearch">
        <template #append>
          <span><icon-render class="search-ico" name="search" /></span>
        </template>
      </el-input>
    </div>
    <ul class="icon-list">
      <el-tooltip effect="dark" :content="item" placement="top" v-for="item in data" :key="item">
        <li @click="handleSelect(item)" :class="{ active: modelValue === item }">
          <component :is="component" :[propKey]="item" />
        </li>
      </el-tooltip>
    </ul>
  </ElDialog>
</template>

<script setup>
import { ElDialog, ElTooltip, ElInput } from 'element-plus'
import { ref, shallowRef, onBeforeMount, defineEmits, defineProps, inject } from 'vue'
import { debounce } from 'lodash'

const props = defineProps({
  modelValue: String,
  disabled: Boolean
})

const emits = defineEmits(['update:modelValue'])

const { component, propKey, iconList } = inject('$icon')

const visible = ref(false)

const q = ref('')

const data = shallowRef([])

const open = () => {
  if (props.disabled) {
    return
  }
  visible.value = true
  q.value = ''
  data.value = iconList
}

const handleSearch = debounce(() => {
  if (!q.value) {
    data.value = iconList
  }

  data.value = iconList.filter((item) => item.includes(q.value))
}, 700)

const handleSelect = (name) => {
  emits('update:modelValue', name)
  visible.value = false
}

onBeforeMount(() => {
  data.value = iconList
})
</script>

<style scoped lang="less">
.image {
  width: 50px;
  height: 50px;
  display: block;
  border-radius: 6px;
}
.container {
  border: 1px dashed var(--el-border-color);
  width: 50px;
  height: 50px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  //   text-align: center;
  font-size: 12px;
  color: #8c939d;
  //   line-height: 50px;
  display: flex;
  &:hover {
    border-color: var(--el-color-primary);
  }
}
.disabled {
  cursor: not-allowed;
  background-color: var(--el-disabled-bg-color);
  &:hover {
    border-color: var(--el-border-color);
  }
}

.searchBar {
  margin-bottom: 15px;
  cursor: pointer;
  &:hover .search-ico {
    color: var(--el-color-primary) !important;
  }
}

.icon-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding-left: 0;

  li {
    &:hover {
      border: 1px solid var(--el-color-primary-light-3);
      color: var(--el-color-primary-light-3);
      cursor: pointer;
    }
    border: 1px solid #eee;
    box-sizing: border-box;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 25px;
  }

  .active {
    border: 1px solid var(--el-color-primary);
    color: var(--el-color-primary);
    cursor: pointer;
  }
}

.un-selected {
  margin: auto;
}

.selected {
  font-size: 2em;
  margin: auto;
}
</style>
