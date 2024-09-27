<template>
  <div class="attrForm">
    <FormRender :key="current!.designKey" v-model="current!" :schema="attrSchema" />

    <el-divider>{{ locale.attr.tab1.linkage.text }}</el-divider>

    <div class="current-footer">
      <el-button v-for="{ title, onClick } in linkageBtns" :key="title" type="primary" plain @click="onClick">{{ title }}</el-button>
    </div>

    <ConfigLinkage v-model="configLinkageVisible" />
    <ValueLinkage v-model="valueLinkageVisible" />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { $current, $global, $locale } from '@/config/symbol'
import { FormRender } from '@/components'
import { getDataByPath } from '@/utils'
import { isString } from 'lodash'
import type { FormItemType, FormSchema } from '@/release'
import ConfigLinkage from './ConfigLinkage.vue'
import ValueLinkage from './ValueLinkage.vue'

const { elements } = inject($global)!

const { current } = inject($current)!

const locale = inject($locale)!

const configLinkageVisible = ref(false)
const valueLinkageVisible = ref(false)

const attrSchema = computed(() => {
  if (current.value) {
    const config = elements[current.value.component]

    if (config.attrSchema) {
      const parseItems = (nodes: FormItemType[]) => {
        return nodes.map((item) => {
          const value = getDataByPath(current.value!, item.name)
          if (isString(value) && /^{{\s*(.*?)\s*}}$/.test(value)) {
            // 将联动组件改用弹窗展示
            return { ...item, component: 'Input', dialog: true }
          }
          if (item.children) {
            item.children = parseItems(item.children)
          }
          return item
        })
      }

      const items = parseItems(config.attrSchema.items)

      return {
        ...config.attrSchema,
        items: [
          {
            label: '组件类型',
            component: 'Tag',
            name: 'componentType',
            props: {
              text: config.name
            }
          },
          ...items
        ]
      }
    }
  }

  return { size: 'small', labelAlign: 'top', items: [] } satisfies FormSchema
})

const linkageBtns = [
  {
    title: locale.value.attr.tab1.linkage.action1,
    onClick: () => (configLinkageVisible.value = true)
  },
  {
    title: locale.value.attr.tab1.linkage.action2,
    onClick: () => (valueLinkageVisible.value = true)
  }
]
</script>

<style scoped lang="less">
.attrForm {
  .current-footer {
    text-align: center;
  }
}
</style>
