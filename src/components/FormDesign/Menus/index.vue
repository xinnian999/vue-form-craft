<template>
  <div :class="namespace('form-design-menus')">
    <el-button
      :class="namespace('form-design-menus-template-btn')"
      size="small"
      @click="drawerVisible = true"
      >{{ locale.menus.useTemplateBtn }}</el-button
    >

    <el-drawer
      v-model="drawerVisible"
      title="模板列表"
      size="60%"
      :class="namespace('form-design-menus-template-drawer')"
      :append-to-body="false"
    >
      <el-space wrap>
        <el-button
          :key="name"
          v-for="{ name, schema } in designInstance.templates"
          @click="useTemplate(schema)"
        >
          {{ name }}
        </el-button>
      </el-space>
    </el-drawer>

    <div v-for="{ title, children } in menus" :key="title">
      <h4 :class="namespace('form-design-menus-type-title')">{{ title }}</h4>
      <draggable
        :class="namespace('form-design-menus-list')"
        :list="children"
        :group="{ name: 'formDesign', pull: 'clone', put: false }"
        :sort="false"
        :ghost-class="namespace('form-design-menus-ghost')"
        :drag-class="namespace('form-design-menus-drag')"
        :fallback-class="namespace('form-design-menus-fallback')"
        item-key="designKey"
      >
        <template #item="{ element }">
          <li :class="namespace('form-design-menus-list-item')">
            <div :class="namespace('form-design-menus-list-item-ico')">
              <component class="ico-content" :is="element.icon" />
            </div>
            <div
              :class="namespace('form-design-menus-list-item-name')"
              :style="{ fontSize: lang === 'zh' ? '12px' : '10px' }"
            >
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
import { computed } from 'vue'
import { ref } from 'vue'
import parseMenus from './menus'
import type { FormSchema } from '@vue-form-craft/config/commonType'
import { useDesignInstance, useElements, useLang, useLocale } from '@vue-form-craft/hooks'
import { namespace } from '@vue-form-craft/utils'

const drawerVisible = ref(false)

const designInstance = useDesignInstance()

const elements = useElements()

const locale = useLocale()

const lang = useLang()

const menus = computed(() =>
  parseMenus({ elements, omits: designInstance.omitMenus, lang: lang.value })
)

const useTemplate = (templateSchema: FormSchema) => {
  designInstance.updateSchema(templateSchema)
}
</script>

<style lang="scss">
// .formDesign-menus {
//   .template-btn {
//     position: absolute;
//     right: 10px;
//     top: 15px;
//   }

//   .template-drawer {
//     position: absolute;
//     text-align: center;
//   }
//   .el-overlay {
//     position: absolute;
//   }

//   .ghost,
//   .fallback,
//   .drag {
//     list-style: none;
//   }

//   .type-title {
//     margin-bottom: 10px;
//     margin-top: 10px;
//   }
//   .list {
//     display: grid;
//     grid-template-columns: repeat(3, 1fr);
//     @media screen and (max-width: 1300px) {
//       grid-template-columns: repeat(2, 1fr);
//     }

//     @media screen and (max-width: 800px) {
//       grid-template-columns: repeat(1, 1fr);
//     }
//     gap: 10px;
//     width: 100%;
//     padding-left: 0;
//     .form-item-btn {
//       list-style: none;
//       padding: 5px 0px;
//       cursor: move;
//       border: 1px dashed transparent;
//       transition: 0.3s all;
//       &:hover {
//         // border: 1px dashed var(--el-color-primary);
//         box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
//         color: var(--el-color-primary);
//       }
//       background-color: var(--el-color-primary-light-9);
//       // display: flex;
//       text-align: center;
//       .ico {
//         height: 40px;
//         display: flex;
//         align-items: center;
//         font-size: 20px;
//         justify-content: center;
//         .ico-content {
//           display: inline-block;
//           width: 1em;
//           height: 1em;
//           overflow: hidden;
//           fill: currentColor;
//         }
//       }
//       .name {
//         font-size: 13px;
//       }
//     }
//   }
// }
</style>
