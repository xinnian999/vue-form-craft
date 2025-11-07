<template>
  <div :class="ns('attr')">
    <FormRender :key="current.designKey" v-model="current" :schema="attrSchema">
      <template #label="{ label, name }">
        <span class="label" @click="handleEditAttr(name)">
          {{ label }}
        </span>
      </template>
    </FormRender>

    <!-- <StyleConfig :key="current.designKey" v-model="currentProps" />

    <LinkageConfig v-model="current" /> -->
  </div>
</template>

<script setup lang="ts">
import { isString } from 'lodash'
import { computed } from 'vue'
import { FormRender } from '@/components'
import { useDesignInstance, useElements, useLang } from '@/hooks'
import type { FormItemType, FormSchema } from '@/types'
import { getDataByPath, ns, setDataByPath } from '@/utils'
import formAttrSchema from './formOptions'
import LinkageConfig from './LinkageConfig/index.vue'
import StyleConfig from './StyleConfig/index.vue'

const designInstance = useDesignInstance()!

const elements = useElements()

const lang = useLang()

const current = defineModel<FormItemType>({ required: true })

const attrSchema = computed<FormSchema>(() => {
  if (designInstance.currentKey === 'root') {
    return formAttrSchema
  }

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
      items
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

const handleEditAttr = (name: string) => {
  designInstance.handleJson(name)
}
</script>

<style lang="scss" scoped>
@import '@/style';

@include ns('attr') {
  .label {
    cursor: pointer;
    &:hover {
      color: var(--el-color-primary);
    }
  }
}
</style>
