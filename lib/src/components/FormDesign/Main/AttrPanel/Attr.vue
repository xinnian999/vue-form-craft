<template>
  <div :class="ns('attr')">
    <FormRender
      v-if="designInstance.currentKey == 'root'"
      v-model="schemaModel"
      :schema="formAttrSchema"
      @fieldChange="onRootFieldChange"
    />
    <FormRender v-else v-model="nodeModel!" :schema="attrSchema" @fieldChange="onNodeFieldChange" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { FormRender } from '@/components'
import { formAttrSchema } from '@/config'
import { useDesignInstance, useElements } from '@/hooks'
import type { FormItemType, FormSchema } from '@/types'
import { ns } from '@/utils'

const designInstance = useDesignInstance()!

const elements = useElements()

const schemaModel = computed({
  get() {
    return designInstance.getSchema()
  },
  set(schema) {
    // console.log('schema changed:', schema)
    designInstance.setSchema(schema)
  }
})

const nodeModel = computed({
  get() {
    return designInstance.getNodeByKey(designInstance.currentKey)
  },
  set(node) {
    const oldNode = designInstance.getNodeByKey(designInstance.currentKey)
    if (oldNode) {
      Object.assign(oldNode, node)
    }
  }
})

const attrSchema = computed<FormSchema>(() => {
  if (!nodeModel.value) {
    return { size: 'small', labelAlign: 'top', items: [] } satisfies FormSchema
  }
  const config = elements[nodeModel.value!.component]

  if (config?.attrSchema) {
    const parseItems = (nodes: FormItemType[] = []): FormItemType[] => {
      return nodes.map((item) => {
        const value = nodeModel.value?.[item.name as keyof typeof nodeModel.value]
        const isTemplate = typeof value === 'string' && /^{{\s*(.*?)\s*}}$/.test(value)

        return {
          ...item,
          component: isTemplate ? 'Custom' : item.component,
          props: isTemplate
            ? {
                componentName: 'FormDesign-JsExpr'
              }
            : item.props,
          children: item.children && parseItems(item.children)
        }
      })
    }
    return {
      ...config.attrSchema,
      items: parseItems(config.attrSchema.items)
    }
  }

  return {
    size: 'small',
    labelAlign: 'top',
    items: [
      {
        name: 'text',
        labelWidth: 0,
        component: 'Text',
        props: {
          text: '此节点不支持配置'
        }
      }
    ]
  } satisfies FormSchema
})

const onRootFieldChange = () => {
  designInstance.recordHistory(`修改表单属性`)
}

const onNodeFieldChange = () => {
  designInstance.recordHistory(`修改节点属性`)
}
</script>
