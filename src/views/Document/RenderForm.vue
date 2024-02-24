<template>
  <div class="renderVue">
    <div class="renderForm">
      <schema-form :schema="schema" footer @onFinish="onFinish" />
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
import { ElCollapse, ElCollapseItem } from 'element-plus'
import { CodeMirror } from '@/components'

defineProps({
  // 表单JSON配置
  schema: {
    type: Object,
    default: () => ({ labelWidth: 150, labelAlign: 'right', size: 'default', items: [] })
  }
})

const activeNames = ref([])

const onFinish = (values) => {
  alert(JSON.stringify(values))
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
