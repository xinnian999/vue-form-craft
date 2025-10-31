<template>
  <div :class="ns('form-design-left')">
    <el-tabs v-model="tabKey" type="border-card" :class="ns('form-design-tabs')">
      <el-tab-pane v-for="{ title, key, render } in tabs" :key="key" :label="title" :name="key">
        <component :is="render" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AI } from '@/components'
import { useGlobals } from '@/hooks'
import { ns } from '@/utils'
import List from './List.vue'
import Template from './Template.vue'

const tabKey = ref('elements')

const { ai } = useGlobals()

const tabs = [
  {
    title: '元素',
    key: 'elements',
    render: List
  },
  {
    title: '模板',
    key: 'templates',
    render: Template
  }
]

if (ai) {
  tabs.push({
    title: 'AI',
    key: 'ai',
    render: AI
  })
}
</script>

<style lang="scss">
@import '@/style';

@include ns('form-design-left') {
  width: 300px;
  position: relative;
  overflow: auto;

  @include ns('menu') {
    &-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      width: 100%;
      padding: 5px;
      box-sizing: border-box;

      &-ghost,
      &-fallback,
      &-drag {
        list-style: none;
      }

      @media screen and (max-width: 1300px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media screen and (max-width: 800px) {
        grid-template-columns: repeat(1, 1fr);
      }

      &-item {
        list-style: none;
        padding: 5px 0px;
        cursor: move;
        border: 1px dashed transparent;
        transition: 0.3s all;
        &:hover {
          box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
          color: $themeColor;
        }
        background-color: $lightThemeColor;
        text-align: center;
        &-ico {
          // height: 40px;
          // display: flex;
          // align-items: center;
          font-size: 20px;
          // justify-content: center;
          .ico-content {
            display: inline-block;
            width: 1em;
            height: 1em;
            overflow: hidden;
            fill: currentColor;
          }
        }
        &-name {
          font-size: 13px;
        }
      }
    }
  }

  .template-list {
    .title {
      font-size: 14px;
      font-weight: bold;
      margin: 5px 0px;
    }
    .description {
      font-size: 12px;
      color: #999;
      margin: 5px 0px;
      margin-bottom: 20px;
    }

    .el-tree-node__content {
      height: auto;
      padding: 5px;
      margin-bottom: 5px;
      overflow: hidden;
    }

    .catalog {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .form {
      padding: 5px 0;
      width: 100%;
      .form-header {
        display: flex;
        align-items: center;
        gap: 5px;
        .edit {
          cursor: pointer;
          margin-left: auto;
          font-size: 18px;
        }
      }
      .form-description {
        font-size: 12px;
        color: #999;
        // padding-right: 20px;
        margin-top: 5px;
        white-space: wrap;
      }
    }
  }
}
</style>
