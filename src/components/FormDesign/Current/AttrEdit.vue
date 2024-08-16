<template>
  <div class="attrForm">
    <h4 v-if="!Object.keys(current).length">未选中字段</h4>

    <template v-else>
      <FormRender :key="current.designKey" v-model="current" :schema="attrSchema"></FormRender>

      <div>
        <el-button @click="handleEdit">编辑此字段JSON</el-button>
      </div>

      <el-dialog destroy-on-close v-model="editVisible" top="3vh">
        <!-- <el-alert
          title="tip"
          type="info"
          description="如果字段现有的配置项不能满足需求，可以在下方props配置里，手动传递额外的参数，支持对应组件在el文档的所有Props"
        ></el-alert> -->
        <json-editor-vue
          class="editor"
          v-model="current"
          currentMode="code"
          :modeList="['text', 'view', 'tree', 'code', 'form']"
          :options="{ search: true, history: true }"
          language="zh"
        />
      </el-dialog>
    </template>
  </div>
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import JsonEditorVue from 'json-editor-vue3'
import { ElButton, ElDialog, ElAlert } from 'element-plus'
import { $current, $global } from '@/config/symbol'
import { FormRender } from '@/components'

const { elements } = inject($global)

const { current } = inject($current)

const editVisible = ref(false)

const attrSchema = computed(() => {
  const config = elements[current.value.component]

  if (config.attrSchema) {
    return config.attrSchema
  }

  if (config) {
    return { size: 'small', labelAlign: 'top', items: config.attr }
  }

  return { size: 'small', labelAlign: 'top', items: [] }
})

const handleEdit = () => {
  editVisible.value = true
}
</script>

<style scoped lang="less">
.attrForm {
  h3 {
    margin-bottom: 10px;
  }
}
</style>
