<template>
  <div :class="ns('form-design-left')" :style="{ overflow: drawerVisible ? 'hidden' : 'auto' }">
    <div :class="ns('template')">
      <a-button :class="ns('template-button')" size="small" @click="drawerVisible = true">{{
        locale.menus.useTemplateBtn
      }}</a-button>

      <a-drawer
        :open="drawerVisible"
        title="模板列表"
        :class="ns('template-drawer')"
        :get-container="false"
        @close="drawerVisible = false"
      >
        <a-space wrap direction="vertical" alignment="start">
          <a-button :key="name" v-for="{ name, schema } in templates" @click="useTemplate(schema)">
            {{ name }}
          </a-button>
        </a-space>
      </a-drawer>
    </div>

    <div v-for="{ title, children } in menus" :key="title" :class="ns('menu')">
      <h4 :class="ns('menu-title')">{{ title }}</h4>
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
          <li :class="ns('menu-list-item')">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { template } from '@/config'
import { computed, ref } from 'vue'
import draggable from 'vuedraggable-es-fix'
import type { FormElement, FormItemType, FormSchema } from '@vue-form-craft/core'
import {
  getRandomId,
  ns,
  useDesignInstance,
  useElements,
  useLang,
  useLocale
} from '@vue-form-craft/core'
import parseMenus from './menus'

const drawerVisible = ref(false)

const designInstance = useDesignInstance()

const elements = useElements()

const locale = useLocale()

const lang = useLang()

const templates = designInstance.templates?.length ? designInstance.templates : template

const menus = computed(() =>
  parseMenus({ elements, omits: designInstance.omitMenus || [], lang: lang.value })
)

const useTemplate = (templateSchema: FormSchema) => {
  designInstance.updateSchema(templateSchema)
}

const onClone = (source: FormElement) => {
  const parse: FormItemType = {
    component: source.component,
    designKey: `design-${getRandomId(4)}`,
    name: `form-${getRandomId(4)}`
  }

  if (source.type === 'layout') {
    parse.children = []
  }

  return parse
}
</script>
