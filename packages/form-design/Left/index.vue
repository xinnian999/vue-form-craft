<template>
  <div :class="ns('form-design-left')" :style="{ overflow: drawerVisible ? 'hidden' : 'auto' }">
    <div :class="ns('template')">
      <el-button :class="ns('template-button')" size="small" @click="drawerVisible = true">{{
        locale.menus.useTemplateBtn
      }}</el-button>

      <el-drawer
        v-model="drawerVisible"
        title="模板列表"
        size="70%"
        :class="ns('template-drawer')"
        :append-to-body="false"
      >
        <el-space wrap direction="vertical" alignment="start">
          <el-button :key="name" v-for="{ name, schema } in templates" @click="useTemplate(schema)">
            {{ name }}
          </el-button>
        </el-space>
      </el-drawer>
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
        @clone="onClone"
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
import draggable from 'vuedraggable-es'
import { computed } from 'vue'
import { ref } from 'vue'
import parseMenus from './menus'
import type { FormSchema } from '@vue-form-craft/types'
import { useDesignInstance, useElements, useLang, useLocale } from '@vue-form-craft/hooks'
import { getRandomId, ns } from '@vue-form-craft/utils'
import { template } from '@vue-form-craft/config'
import { cloneDeep } from 'lodash'

const drawerVisible = ref(false)

const designInstance = useDesignInstance()

const elements = useElements()

const locale = useLocale()

const lang = useLang()

const templates = designInstance.templates.length ? designInstance.templates : template

const menus = computed(() =>
  parseMenus({ elements, omits: designInstance.omitMenus, lang: lang.value })
)

const useTemplate = (templateSchema: FormSchema) => {
  designInstance.updateSchema(templateSchema)
}

const onClone = (e: Record<string, any>) => {
  const source = cloneDeep(e.item.__draggable_context.element)

  e.item.__draggable_context.element = {
    component: source.component,
    designKey: `design-${getRandomId(4)}`,
    name: `form-${getRandomId(4)}`
  }

  if (source.type === 'layout') {
    e.item.__draggable_context.element.children = []
  }
}
</script>
