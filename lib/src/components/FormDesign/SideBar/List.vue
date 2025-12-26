<template>
  <div :class="ns('components')">
    <Input v-model="q" class="responsive-input" placeholder="搜索组件" clearable>
      <template #prefix>
        <Icon name="search" />
      </template>
    </Input>
    <!-- 搜索结果直接展示 -->
    <div v-if="q.trim()" :class="ns('search-result')">
      <draggable
        v-if="filteredComponents.length > 0"
        :class="ns('menu-list')"
        :list="filteredComponents"
        :group="{ name: 'formDesign', pull: 'clone', put: false }"
        :sort="false"
        :ghost-class="ns('menu-list-ghost')"
        :drag-class="ns('menu-list-drag')"
        :fallback-class="ns('menu-list-fallback')"
        item-key="designKey"
        :clone="onClone"
      >
        <template #item="{ element }">
          <li
            :class="[ns('menu-list-item'), `menu-${element.component}`]"
            @dblclick="handleDbClick(element)"
          >
            <div :class="ns('menu-list-item-ico')">
              <ElementIcon :icon="element.icon" />
            </div>
            <div :class="ns('menu-list-item-name')">
              {{ element.title }}
            </div>
          </li>
        </template>
      </draggable>
      <div v-else :class="ns('no-result')">暂无匹配的组件</div>
    </div>
    <!-- 无搜索时使用折叠面板 -->
    <div v-else>
      <div v-for="{ title, children } in menus" :key="title" :title="title" :name="title">
        <div :class="ns('menu-list-title')">{{ title }}</div>
        <draggable
          :class="ns('menu-list')"
          :list="children"
          :group="{ name: 'formDesign', pull: 'clone', put: false }"
          :sort="false"
          :ghost-class="ns('menu-list-ghost')"
          :drag-class="ns('menu-list-drag')"
          :fallback-class="ns('menu-list-fallback')"
          item-key="designKey"
          :clone="onClone"
        >
          <template #item="{ element }">
            <li
              :class="[ns('menu-list-item'), `menu-${element.component}`]"
              @dblclick="handleDbClick(element)"
            >
              <div :class="ns('menu-list-item-ico')">
                <ElementIcon :icon="element.icon" />
              </div>
              <div :class="ns('menu-list-item-name')">
                {{ element.title }}
              </div>
            </li>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash'
import { computed, ref } from 'vue'
import draggable from 'vuedraggable-es-fix'
import { ElementIcon, Icon } from '@/components'
import { useDesignInstance, useElements, useUI } from '@/hooks'
import type { FormElement, FormItemType } from '@/types'
import { generateDesignKey, generateName, ns, repirNode } from '@/utils'
import parseMenus from './menus'

const { Input, Collapse, CollapseItem } = useUI()

const designInstance = useDesignInstance()!

const elements = useElements()

const active = ref(['基础组件', '布局组件'])

const q = ref('')

const menus = computed(() => parseMenus({ elements, omits: designInstance.getOmitMenus() }))

// 搜索过滤后的组件列表
const filteredComponents = computed(() => {
  const query = q.value.trim().toLowerCase()
  if (!query) return []

  const allComponents: any[] = []
  menus.value.forEach((menu) => {
    menu.children.forEach((child) => {
      // 支持中文标题和英文组件名搜索
      const title = child.title.toLowerCase()
      const component = child.component.toLowerCase()
      if (title.includes(query) || component.includes(query)) {
        allComponents.push(child)
      }
    })
  })

  return allComponents
})

const onClone = (source: FormElement) => {
  const parse: FormItemType = {
    component: source.component,
    designKey: generateDesignKey(),
    name: generateName()
  }

  if (source.type === 'basic') {
    parse.label = source.title
  }

  if (source.attrSchema.initialValues) {
    Object.assign(parse, source.attrSchema.initialValues)
  }

  return cloneDeep(repirNode(parse))
}

const handleDbClick = (element: FormElement) => {
  const item = onClone(element)

  designInstance.addItem(item)
}
</script>

<style lang="scss" scoped>
@import '@/style';

@include ns('components') {
  .responsive-input {
    margin-bottom: 10px;
  }
}

@include ns('search-result') {
  padding: 10px 0;
}

@include ns('no-result') {
  text-align: center;
  padding: 40px 20px;
  color: #999;
  font-size: 14px;
}

@include ns('menu') {
  &-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    width: 100%;
    // padding: 5px;
    box-sizing: border-box;

    &-title {
      font-size: 12px;
      margin: 15px 0px 10px;
      color: #999;
    }

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
      border-radius: 5px;
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
      }
      &-name {
        font-size: 13px;
      }
    }
  }
}
</style>
