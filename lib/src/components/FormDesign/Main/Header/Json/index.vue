<template>
  <Modal
    v-model="visible"
    title="JsonSchema"
    width="75%"
    center
    destroyOnClose
    :to="`.${ns('form-design')}`"
    top="5vh"
    @close="formValues = {}"
  >
    <Tabs model-value="edit" class="demo-tabs">
      <TabPane name="edit">
        <template #label>
          <Icon name="script" style="margin-right: 5px" />
          <span>在线编辑</span>
        </template>
        <JsonSchemaEdit :json="json" @save="onSave" />
      </TabPane>
      <TabPane name="ts" lazy>
        <template #label>
          <Icon name="ts" style="margin-right: 5px" />
          <span>生成TS文件</span>
        </template>
        <CodeHighLight style="height: 70vh" language="ts" :code="tsJsonSchema(json)" />
      </TabPane>
      <TabPane name="js" lazy>
        <template #label>
          <Icon name="js" style="margin-right: 5px" />
          <span>生成JS文件</span>
        </template>
        <CodeHighLight style="height: 70vh" language="js" :code="jsJsonSchema(json)" />
      </TabPane>
      <TabPane name="tsVue" lazy>
        <template #label>
          <Icon name="vue" style="margin-right: 5px" />
          <span>生成TS组件</span>
        </template>
        <CodeHighLight style="height: 70vh" :code="tsVue(json)" language="vue" />
      </TabPane>
      <TabPane name="jsVue" lazy>
        <template #label>
          <Icon name="vue" style="margin-right: 5px" />
          <span>生成JS组件</span>
        </template>
        <CodeHighLight style="height: 70vh" :code="jsVue(json)" language="vue" />
      </TabPane>
    </Tabs>
  </Modal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { CodeHighLight, Icon } from '@/components'
import { useDesignInstance, useUI } from '@/hooks'
import type { FormSchema } from '@/types'
import { ns } from '@/utils'
import { jsJsonSchema, jsVue, tsJsonSchema, tsVue } from './config'
import JsonSchemaEdit from './Edit.vue'

const { Modal, Tabs, TabPane } = useUI()

const visible = defineModel<boolean>()

const designInstance = useDesignInstance()!

const json = computed(() => designInstance.getSchema())

const formValues = ref({})

const onSave = (json: FormSchema) => {
  designInstance.setSchema(json)
  designInstance.recordHistory('编辑JSON')
  visible.value = false
}
</script>
