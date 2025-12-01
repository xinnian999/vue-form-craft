<template>
  <el-dialog
    v-model="visible"
    title="预览"
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
            class="preview-FormRender"
            :schema="designInstance.getSchema()"
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
            read
          />
        </div>
      </el-tab-pane>

      <el-tab-pane label="联动变量" name="context">
        <VueMonacoEditor v-model:value="context" language="json" style="height: 60vh" />
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script setup lang="ts">
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'
import { computed, ref } from 'vue'
import { FormRender } from '@/components'
import { useDesignInstance } from '@/hooks'
import type { FormInstance } from '@/types'

const designInstance = useDesignInstance()!

const tabKey = ref('edit')

const formRef = ref<FormInstance>()

const formValues = ref({})

const visible = defineModel<boolean>()

const context = computed(() => JSON.stringify(formRef.value?.context, null, 2))

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
