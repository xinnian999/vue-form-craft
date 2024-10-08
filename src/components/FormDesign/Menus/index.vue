<template>
  <div class="formDesign-menus">
    <el-button class="template-btn" size="small" @click="drawerVisible = true">{{
      locale.menus.useTemplateBtn
    }}</el-button>
    <el-drawer
      v-model="drawerVisible"
      title="模板列表"
      size="60%"
      class="template-drawer"
      :append-to-body="false"
    >
      <el-space wrap>
        <el-button :key="name" v-for="{ name, schema } in templates" @click="useTemplate(schema)">
          {{ name }}
        </el-button>
      </el-space>
    </el-drawer>

    <div v-for="{ title, children } in menus" :key="title">
      <h4 class="type-title">{{ title }}</h4>
      <draggable
        class="list"
        :list="children"
        :group="{ name: 'formDesign', pull: 'clone', put: false }"
        :sort="false"
        ghost-class="ghost"
        drag-class="drag"
        fallback-class="fallback"
        item-key="designKey"
      >
        <template #item="{ element }">
          <li class="form-item-btn">
            <div class="ico">
              <component class="ico-content" :is="element.icon" />
            </div>
            <div class="name" :style="{ fontSize: lang === 'zh' ? '12px' : '10px' }">
              {{ element.name }}
            </div>
          </li>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable-es'
import { computed, inject, type Ref } from 'vue'
import { $global, $locale, $schema } from '@vue-form-craft/config/symbol'
import { ref } from 'vue'
import parseMenus from './menus'
import templateMock from '@vue-form-craft/template'
import type { FormSchema, TemplateData } from '@vue-form-craft/config/commonType'

const props = withDefaults(
  defineProps<{
    templates?: TemplateData
    omitMenus?: string[]
  }>(),
  { templates: () => templateMock, omitMenus: () => [] }
)

const drawerVisible = ref(false)

const { updateSchema } = inject($schema)!

const { elements } = inject($global)!

const locale = inject($locale)!

const lang = inject<Ref<'zh' | 'en'>>('vfc-lang')!

const menus = computed(() => parseMenus({ elements, omits: props.omitMenus, lang: lang.value }))

const useTemplate = (templateSchema: FormSchema) => {
  updateSchema(templateSchema)
}
</script>

<style lang="less">
.formDesign-menus {
  .template-btn {
    position: absolute;
    right: 10px;
    top: 15px;
  }

  .template-drawer {
    position: absolute;
    text-align: center;
  }
  .el-overlay {
    position: absolute;
  }

  .ghost,
  .fallback,
  .drag {
    list-style: none;
  }

  .type-title {
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    @media screen and (max-width: 1300px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 800px) {
      grid-template-columns: repeat(1, 1fr);
    }
    gap: 10px;
    width: 100%;
    padding-left: 0;
    .form-item-btn {
      list-style: none;
      padding: 5px 0px;
      cursor: move;
      border: 1px dashed transparent;
      transition: 0.3s all;
      &:hover {
        // border: 1px dashed var(--el-color-primary);
        box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
        color: var(--el-color-primary);
      }
      background-color: var(--el-color-primary-light-9);
      // display: flex;
      text-align: center;
      .ico {
        height: 40px;
        display: flex;
        align-items: center;
        font-size: 20px;
        justify-content: center;
        .ico-content {
          display: inline-block;
          width: 1em;
          height: 1em;
          overflow: hidden;
          fill: currentColor;
        }
      }
      .name {
        font-size: 13px;
      }
    }
  }
}
</style>
