<template>
  <div class="style-editor-demo">
    <h2>样式编辑器组件示例</h2>
    <p>这个组件可以通过表单的方式编辑CSS样式，生成一个style对象</p>

    <el-card style="margin-top: 20px">
      <template #header>
        <div style="display: flex; justify-content: space-between; align-items: center">
          <span>基础使用</span>
        </div>
      </template>

      <FormRender v-model="formData" :schema="schema" />

      <el-divider />

      <div>
        <h4>当前样式对象：</h4>
        <pre>{{ JSON.stringify(formData.customStyle, null, 2) }}</pre>
      </div>

      <el-divider />

      <div>
        <h4>预览效果：</h4>
        <div :style="formData.customStyle" class="preview-box">
          这是一个应用了自定义样式的预览框
        </div>
      </div>
    </el-card>

    <el-card style="margin-top: 20px">
      <template #header>
        <span>在表单设计器中使用</span>
      </template>
      <p>在表单配置中，可以这样使用样式编辑器：</p>
      <pre><code>{
  label: '自定义样式',
  component: 'Custom',
  name: 'style',
  props: {
    componentName: 'FormDesign-StyleEditor'
  }
}</code></pre>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FormRender } from '../../../form-craft/src'
import type { FormSchema } from '../../../form-craft/src/types'

const formData = ref({
  customStyle: {
    width: '300px',
    padding: '20px',
    backgroundColor: '#f0f9ff',
    borderRadius: '8px',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: '#3b82f6',
    fontSize: '16px',
    color: '#1e40af'
  }
})

const schema: FormSchema = {
  labelWidth: 120,
  labelAlign: 'right',
  items: [
    {
      label: '自定义样式',
      component: 'Custom',
      name: 'customStyle',
      props: {
        componentName: 'FormDesign-StyleEditor'
      }
    }
  ]
}
</script>

<style scoped>
.style-editor-demo {
  padding: 20px;
}

.preview-box {
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

pre {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
}

code {
  font-family: 'Courier New', Courier, monospace;
}
</style>
