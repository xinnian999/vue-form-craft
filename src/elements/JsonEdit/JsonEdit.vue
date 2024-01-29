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
        :options="{ search: false, history: false }"
        language="zh"
        :style="{ height: '60vh' }"
      />
    </el-dialog>
  </template>

  <template v-if="mode === 'direct'">
    <json-editor-vue
      class="editor-direct"
      v-model="json"
      :key="key"
      currentMode="code"
      :modeList="['text', 'view', 'tree', 'code', 'form']"
      :options="{ search: false, history: false }"
      language="zh"
      :style="{ height }"
    />
  </template>
</template>

<script setup lang="jsx">
import { ref, computed, onMounted } from 'vue'
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
    default: 'direct'
  },
  height: null,
  description: String
})

const emits = defineEmits(['update:modelValue'])

const json = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  }
})

const execVisible = ref(false)

const key = ref(null)

const handlePreviewExec = () => {
  execVisible.value = true
}

onMounted(() => {
  key.value = 'initialValue'
})
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

.jsoneditor-undo,
.jsoneditor-redo,
.jsoneditor-poweredBy,
.jsoneditor-sort {
  display: none;
}
.full-screen {
  right: 10px !important;
}
</style>
