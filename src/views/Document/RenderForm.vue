<template>
  <div class="renderVue">
    <div class="renderForm">
      <schema-form :schema="schema" ref="formRef" />
      <ElButton @click="handleSubmit" type="primary" style="margin-left: 150px">提交</ElButton>
    </div>

    <ElCollapse v-model="activeNames">
      <ElCollapseItem title="查看源码" name="1">
        <CodeMirror v-if="activeNames.length" class="preview-code" :schema="schema" />
      </ElCollapseItem>
    </ElCollapse>
  </div>
</template>

<script setup lang="jsx">
import { defineProps, ref } from 'vue'
import { ElCollapse, ElCollapseItem, ElButton } from 'element-plus'
import { CodeMirror } from '@/components'

defineProps({
  // 表单JSON配置
  schema: {
    type: Object,
    default: () => ({ labelWidth: 150, labelAlign: 'right', size: 'default', items: [] })
  }
})

const activeNames = ref([])

const formRef = ref()

const handleSubmit = () => {
  formRef.value
    .submit()
    .then((values) => {
      alert(JSON.stringify(values))
    })
    .catch(() => console.log('表单校验不通过'))
}
</script>

<style lang="less">
.renderVue {
  margin: 15px 0;
  border: 1px solid #eee;
  .el-collapse-item__header {
    padding-left: 15px;
  }
  .renderForm {
    padding: 20px;
  }

  .preview-code {
    pre:before {
      display: none;
    }
    pre {
      box-shadow: none;
    }
  }
}
</style>
