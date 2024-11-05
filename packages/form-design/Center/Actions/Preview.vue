<template>
  <el-dialog
    v-model="visible"
    :title="locale.actions.previewForm"
    width="70%"
    center
    destroy-on-close
    top="10vh"
    @close="formValues = {}"
  >
    <el-tabs v-model="tabKey">
      <el-tab-pane label="编辑模式" name="edit">
        <FormRender
          v-model="formValues"
          :schema="designInstance.schema"
          ref="formRef"
          :schemaContext="designInstance.schemaContext"
          :style="{ minHeight: '200px', padding: '20px' }"
        />
        <div style="text-align: center">
          <el-button @click="handleSubmit" type="primary">模拟提交</el-button>
          <el-button @click="handleReset" type="primary" plain>重置</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="阅读模式" name="read" lazy>
        <FormRender
          v-model="formValues"
          :schema="{ ...designInstance.schema, labelSuffix: ':' }"
          :schemaContext="designInstance.schemaContext"
          :style="{ minHeight: '200px', padding: '20px' }"
          read
        />
      </el-tab-pane>

      <el-tab-pane label="联动变量" name="context">
        <p>实时预览的联动变量，在JsonSchema中可以通过双大括号模版语法使用，用于触发各种联动</p>
        <JsonEdit.component v-model="context" style="height: 60vh" :key="tabKey" />
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import FormRender from '../../../form-render'
import type { FormInstance } from '@vue-form-craft/types'
import { useDesignInstance, useElements, useLocale } from '@vue-form-craft/hooks'

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
