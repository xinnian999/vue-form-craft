<template>
  <Disabled :disabled="disabled" class="jsonEdit-disabled">
    <json-editor-vue
      class="editor-direct"
      v-model="json"
      currentMode="code"
      :modeList="['text', 'view', 'tree', 'code', 'form']"
      :options="{ search: false, history: false }"
      v-bind="$attrs"
    />
  </Disabled>
</template>

<script setup lang="ts">
//@ts-nocheck
import JsonEditorVue from './JsonEditVue.vue'
import { Disabled } from '@vue-form-craft/components'

defineOptions({
  inheritAttrs: false
})

defineProps({
  disabled: Boolean
})

const json = defineModel<Record<string, any>>()
</script>

<style>
.editor-direct {
  width: 100%;
  height: 350px;
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
.jsonEdit-disabled {
  width: 100%;
  opacity: 0.7;
}
</style>
