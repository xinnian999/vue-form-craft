<template>
  <a-modal
    v-model:open="visible"
    :title="locale.actions.previewForm"
    width="70%"
    centered
    destroy-on-close
    top="10vh"
    @cancel="formValues = {}"
  >
    <a-tabs v-model:activeKey="tabKey">
      <a-tab-pane tab="编辑模式" key="edit">
        <FormRender
          v-model="formValues"
          :schema="designInstance.schema"
          ref="formRef"
          :schemaContext="designInstance.schemaContext"
          :style="{ minHeight: '200px', padding: '20px' }"
        />
        <div style="text-align: center">
          <a-button @click="handleSubmit" type="primary">模拟提交</a-button>
          <a-button @click="handleReset" type="primary" plain>重置</a-button>
        </div>
      </a-tab-pane>

      <a-tab-pane tab="阅读模式" key="read" lazy>
        <FormRender
          v-model="formValues"
          :schema="{ ...designInstance.schema, labelSuffix: ':' }"
          :schemaContext="designInstance.schemaContext"
          :style="{ minHeight: '200px', padding: '20px' }"
          read
        />
      </a-tab-pane>

      <a-tab-pane tab="联动变量" key="context">
        <p>实时预览的联动变量，在JsonSchema中可以通过双大括号模版语法使用，用于触发各种联动</p>
        <JsonEdit.render v-model="context" style="height: 60vh" :key="tabKey" />
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { FormRender } from '@/components'
import type { FormInstance } from '@vue-form-craft/core'
import { useDesignInstance, useElements, useLocale } from '@vue-form-craft/core'

const designInstance = useDesignInstance()

const { JsonEdit } = useElements()

const tabKey = ref('edit')

const formRef = ref<FormInstance>()

const formValues = ref({})

const visible = defineModel<boolean>()

const context = computed(() => formRef.value?.context)

const locale = useLocale()

const handleSubmit = async () => {
  await formRef.value?.validate()

  alert(JSON.stringify(formValues.value, null, 2))
}

const handleReset = async () => {
  formRef.value?.resetFields()
}
</script>

<style scoped lang="scss">
.formDesign-actions {
  /* padding: 10px; */
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .formDesign-actions-left,
  .formDesign-actions-right {
    button {
      margin-bottom: 10px;
    }
  }

  .vueCode {
    height: 60vh;
  }
}
</style>
