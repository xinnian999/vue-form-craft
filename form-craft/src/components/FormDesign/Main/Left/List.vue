<template>
  <el-collapse v-model="active" :class="ns('menu')">
    <el-collapse-item
      v-for="{ title, children } in menus"
      :key="title"
      :title="title"
      :name="title"
    >
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
              <component class="ico-content" :is="element.icon" />
            </div>
            <div
              :class="ns('menu-list-item-name')"
              :style="{ fontSize: lang === 'zh' ? '12px' : '10px' }"
            >
              {{ element.title }}
            </div>
          </li>
        </template>
      </draggable>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import draggable from 'vuedraggable-es-fix'
import { useDesignInstance, useElements, useLang } from '@/hooks'
import type { FormElement, FormItemType } from '@/types'
import { generateDesignKey, generateName, ns, repirNode } from '@/utils'
import parseMenus from './menus'

const designInstance = useDesignInstance()!

const elements = useElements()

const lang = useLang()

const active = ref('基础组件')

const menus = computed(() =>
  parseMenus({ elements, omits: designInstance.omitMenus || [], lang: lang.value })
)

const onClone = (source: FormElement) => {
  const parse: FormItemType = {
    component: source.component,
    designKey: generateDesignKey(),
    name: generateName()
  }

  if (source.attrSchema.initialValues) {
    Object.assign(parse, source.attrSchema.initialValues)
  }

  return repirNode(parse)
}

const handleDbClick = (element: FormElement) => {
  const item = onClone(element)

  designInstance.addItem(item)
}
</script>
