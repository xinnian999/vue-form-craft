<template>
  <template v-if="mode === 'dialog'">
    <el-button @click="handlePreviewExec">{{ title }}</el-button>

    <el-dialog v-model="execVisible" :title="title" width="70%" center destroy-on-close>
      <div>{{ description }}</div>
      <json-editor-vue
        class="editor-dialog"
        v-model="json"
        currentMode="code"
        :modeList="['text', 'view', 'tree', 'code', 'form']"
        :options="{ search: true, history: true }"
        language="zh"
        :style="{ height }"
      />
    </el-dialog>
  </template>

  <template v-if="mode === 'direct'">
    <json-editor-vue
      class="editor-direct"
      v-model="json"
      currentMode="code"
      :modeList="['text', 'view', 'tree', 'code', 'form']"
      :options="{ search: true, history: true }"
      language="zh"
      :style="{ height }"
    />
  </template>
</template>

<script setup lang="jsx">
import { ref, computed } from 'vue'
import JsonEditorVue from 'json-editor-vue3'
import { ElButton, ElDialog } from 'element-plus'

const props = defineProps({
  modelValue: {},
  name: String,
  title: {
    type: String,
    default: '编辑'
  },
  mode: {
    type: String,
    default: 'dialog'
  },
  height: null,
  description: String
})

const emits = defineEmits(['update:modelValue'])

const json = computed({
  get() {
    const { name, modelValue } = props
    if (name) {
      return modelValue ? { [name]: modelValue } : { [name]: [] }
    }
    return props.modelValue
  },
  set(val) {
    const { name } = props
    if (name) {
      emits('update:modelValue', val[props.name])
    } else {
      emits('update:modelValue', val)
    }
  }
})

const execVisible = ref(false)

const handlePreviewExec = () => {
  execVisible.value = true
}
</script>

<style>
/* .formDesign-actions {
  padding: 10px;
  text-align: right;
} */

.editor-direct {
  width: 100%;
}

.editor-dialog {
  width: 100%;
}
</style>
