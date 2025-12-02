<template>
  <div :class="ns('form-design-left')">
    <div class="sidebar">
      <el-tooltip v-for="menu in menus" :key="menu.key" :content="menu.title" placement="right">
        <div
          :class="['item', { active: activeKey === menu.key }]"
          :key="menu.key"
          @click="handleClick(menu.key)"
        >
          <Icon :name="menu.icon" />
        </div>
      </el-tooltip>
    </div>
    <div class="content" v-if="visible">
      <div class="topbar">
        <div>
          {{ activeData.title }} <span class="desc">{{ activeData.desc }}</span>
        </div>
        <div class="close" @click="handleClose">
          <Icon name="close" />
        </div>
      </div>
      <div class="render">
        <component :is="activeData.render" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@/components'
import { ns } from '@/utils'
import AI from './AI/index.vue'
import History from './History.vue'
import List from './List.vue'
import Outline from './Outline.vue'
import Template from './Template.vue'

const activeKey = ref('component')

const visible = ref(true)

const activeData = computed(() => {
  return menus.find((menu) => menu.key === activeKey.value)!
})

const menus = [
  {
    title: '元素',
    key: 'component',
    icon: 'component',
    desc: '拖拽或双击组件',
    render: List
  },
  {
    title: '大纲',
    key: 'outline',
    icon: 'outline',
    desc: '',
    render: Outline
  },
  {
    title: '历史记录',
    key: 'history',
    icon: 'history',
    desc: '',
    render: History
  },
  {
    title: '模板',
    key: 'templates',
    icon: 'template',
    desc: '快速切换和配置表单。',
    render: Template
  },
  {
    title: 'AI表单助手',
    key: 'ai',
    icon: 'ai',
    desc: '',
    render: AI
  }
]

const handleClick = (key: string) => {
  activeKey.value = key
  visible.value = true
}

const handleClose = () => {
  visible.value = false
}
</script>

<style scoped lang="scss">
@import '@/style';

@include ns('form-design-left') {
  position: relative;
  overflow: hidden;
  display: flex;
  background-color: #fff;

  .sidebar {
    height: 100%;
    padding: 5px;
    box-sizing: border-box;
    border-right: 1px solid #eee;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #fff;

    .item {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      cursor: pointer;
      font-size: 20px;
      &:hover {
        background-color: #eee;
      }
    }

    .item.active {
      color: $themeColor;
      background-color: #eee;
    }
  }

  .content {
    width: 300px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-right: 1px solid #eee;

    .topbar {
      padding: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
      .desc {
        font-size: 12px;
        color: #999;
      }

      .close {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:hover {
          color: $themeColor;
        }
      }
    }

    .render {
      flex: 1;
      padding: 10px;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
}
</style>
