<template>
  <div class="container" @click="open">
    <icon-render class="selected" v-if="modelValue" :name="modelValue" />
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
      <el-tooltip
        effect="dark"
        :content="name"
        placement="top"
        v-for="{ name, icon } in data"
        :key="name"
      >
        <li @click="handleSelect(name)">
          <component class="icon" :is="icon"></component>
        </li>
      </el-tooltip>
    </ul>
  </ElDialog>
</template>

<script setup>
import { ElDialog, ElTooltip, ElInput } from 'element-plus'
import { ref, shallowRef, onBeforeMount, defineEmits, defineProps } from 'vue'
import { debounce } from 'lodash'

const modules = import.meta.glob('@/icons/*.vue', { eager: true })

const iconData = Object.entries(modules).map(([key, value]) => {
  const name = key.match(/\/([^\/]+)\.vue$/)[1]
  return {
    name,
    icon: value.default
  }
})

defineProps({
  modelValue: String
})

const emits = defineEmits(['update:modelValue'])

const visible = ref(false)

const q = ref('')

const data = shallowRef([])

const open = () => {
  visible.value = true
}

const handleSearch = debounce(() => {
  if (!q.value) {
    data.value = iconData
  }
  data.value = iconData.filter((item) => item.name.includes(q.value))
}, 700)

const handleSelect = (name) => {
  emits('update:modelValue', name)
  visible.value = false
}

onBeforeMount(() => {
  data.value = iconData
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
}

.container:hover {
  border-color: var(--el-color-primary);
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
      border: 1px solid var(--el-color-primary);
      color: var(--el-color-primary);
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
  .icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
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
