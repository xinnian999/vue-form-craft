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
        <div :style="previewStyle">
          <FormRender
            v-model="formValues"
            :schema="designInstance.getSchema()"
            :schemaContext="designInstance.schemaContext"
            ref="formRef"
            @finish="handleFinish"
          />
        </div>
      </el-tab-pane>

      <el-tab-pane label="阅读模式" name="read" lazy>
        <div :style="previewStyle">
          <FormRender
            v-model="formValues"
            :schema="{ ...designInstance.getSchema(), labelSuffix: ':' }"
            :schemaContext="designInstance.schemaContext"
            read
          />
        </div>
      </el-tab-pane>

      <el-tab-pane label="联动变量" name="context">
        <p>实时预览的联动变量，在JsonSchema中可以通过双大括号模版语法使用，用于触发各种联动</p>
        <JsonEdit.render v-model="context" style="height: 60vh" :key="tabKey" />
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { FormRender } from '@/components'
import { useDesignInstance, useElements, useLocale } from '@/hooks'
import type { FormInstance } from '@/types'

const designInstance = useDesignInstance()

const { JsonEdit } = useElements()

const tabKey = ref('edit')

const formRef = ref<FormInstance>()

const formValues = ref({})

const visible = defineModel<boolean>()

const context = computed(() => formRef.value?.context)

const locale = useLocale()

const previewStyle = {
  minHeight: '200px',
  padding: '20px'
}

const handleFinish = async () => {
  alert(JSON.stringify(formValues.value, null, 2))
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
