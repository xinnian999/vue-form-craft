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
    <el-tabs model-value="edit">
      <el-tab-pane label="编辑模式" name="edit">
        <FormRender
          v-model="formValues"
          :schema="schema"
          ref="formRef"
          :schemaContext="schemaContext"
          :style="{ minHeight: '200px', padding: '20px' }"
        />
        <div style="text-align: center;">
          <el-button @click="handleSubmit" type="primary">模拟提交</el-button>
          <el-button @click="handleReset" type="primary" plain>重置</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="阅读模式" name="read">
        <FormRender
          v-model="formValues"
          :schema="{...schema,labelSuffix:':'}"
          :schemaContext="schemaContext"
          :style="{ minHeight: '200px', padding: '20px' }"
          read
        />
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { FormRender } from '@vue-form-craft/components'
import { $locale, $schema } from '@vue-form-craft/config/symbol'
import type { FormRenderInstance } from '@vue-form-craft/release'

defineProps<{
  schemaContext: Record<string, any>
}>()

const { schema } = inject($schema)!

const formRef = ref<FormRenderInstance>()

const formValues = ref({})

const visible = defineModel<boolean>()

const locale = inject($locale)!

const handleSubmit = async () => {
  await formRef.value?.validate()

  alert(JSON.stringify(formValues.value, null, 2))
}

const handleReset = async () => {
  formRef.value?.resetFields()
}
</script>

<style scoped lang="less">
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
