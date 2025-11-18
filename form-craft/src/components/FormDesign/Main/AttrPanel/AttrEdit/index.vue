<template>
  <div :class="ns('attr')">
    <FormRender
      v-if="designInstance.currentKey == 'root'"
      v-model="schemaModel"
      :schema="formAttrSchema"
      @field-change="onRootFieldChange"
    />
    <FormRender
      v-else
      v-model="nodeModel!"
      :schema="attrSchema"
      @field-change="onNodeFieldChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { FormRender } from '@/components'
import { useDesignInstance, useElements } from '@/hooks'
import type { FormSchema } from '@/types'
import { ns } from '@/utils'
import formAttrSchema from './formOptions'

const designInstance = useDesignInstance()!

const elements = useElements()

const schemaModel = computed({
  get() {
    return designInstance.getSchema()
  },
  set(schema) {
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
      designInstance.setSchema(designInstance.getSchema())
    }
  }
})

const attrSchema = computed<FormSchema>(() => {
  if (!nodeModel.value) {
    return { size: 'small', labelAlign: 'top', items: [] } satisfies FormSchema
  }
  const config = elements[nodeModel.value!.component]

  if (config?.attrSchema) {
    return config.attrSchema
  }

  return { size: 'small', labelAlign: 'top', items: [] } satisfies FormSchema
})

const onRootFieldChange = () => {
  designInstance.debounceRecordHistory(`修改表单属性`)
}

const onNodeFieldChange = () => {
  designInstance.debounceRecordHistory(`修改节点属性`)
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
