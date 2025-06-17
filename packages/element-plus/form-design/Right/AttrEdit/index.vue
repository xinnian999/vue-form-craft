<template>
  <div :class="ns('attr')">
    <FormRender :key="current.designKey" v-model="current" :schema="attrSchema" />

    <StyleConfig :key="current.designKey" v-model="currentProps" />

    <LinkageConfig v-model="current" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FormRender from '@/form-render'
import { getDataByPath, ns, setDataByPath } from '@form-magic/core'
import { isString } from 'lodash'
import type { FormItemType, FormSchema } from '@form-magic/core'
import LinkageConfig from './LinkageConfig/index.vue'
import StyleConfig from './StyleConfig/index.vue'
import { useElements, useLang } from '@/hooks'

const elements = useElements()

const lang = useLang()

const current = defineModel<FormItemType>({ required: true })

const attrSchema = computed<FormSchema>(() => {
  const config = elements[current.value.component]

  if (config?.attrSchema) {
    const parseItems = (nodes: FormItemType[] = []): FormItemType[] => {
      return nodes.map((item) => {
        const value = getDataByPath(current.value!, item.name)
        const isTemplate = isString(value) && /^{{\s*(.*?)\s*}}$/.test(value)

        return {
          ...item,
          label: lang.value === 'zh' ? item.label : item.name.split('.').pop(), //国际化翻译
          component: isTemplate ? 'Input' : item.component, // 将联动组件改用弹窗展示
          dialog: isTemplate || item.dialog, // 将联动组件改用弹窗展示,
          children: item.children && parseItems(item.children)
        }
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
            text: config.title
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