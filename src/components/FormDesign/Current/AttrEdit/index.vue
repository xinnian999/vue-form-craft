<template>
  <div class="attrForm">
    <FormRender :key="current.designKey" v-model="current" :schema="attrSchema" />

    <StyleConfig :key="current.designKey" v-model="currentProps" />

    <LinkageConfig v-model="current" />
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { $global } from '@vue-form-craft/config/symbol'
import { FormRender } from '@vue-form-craft/components'
import { getDataByPath, setDataByPath } from '@vue-form-craft/utils'
import { isString } from 'lodash'
import type { FormItemType, FormSchema } from '@vue-form-craft/release'
import LinkageConfig from './LinkageConfig.vue'
import StyleConfig from './StyleConfig.vue'

const { elements } = inject($global)!

const current = defineModel<FormItemType>({ required: true })

const attrSchema = computed(() => {
  const config = elements[current.value.component]

  if (config?.attrSchema) {
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

  return { size: 'small', labelAlign: 'top', items: [] } satisfies FormSchema
})

const currentProps = computed({
  get() {
    return current.value?.props || {}
  },
  set(value) {
    current.value = setDataByPath(current.value!, 'props', value) as FormItemType
  }
})
</script>

<style scoped lang="less">
.attrForm {
  padding-bottom: 20px;
}
</style>
