<template>
  <Codemirror
    style="line-height: 16px"
    v-model:value="value"
    :options="cmOptions"
    border
    ref="cmRef"
  >
  </Codemirror>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, defineProps, computed } from 'vue'
import 'codemirror/mode/javascript/javascript.js'
import Codemirror from 'codemirror-editor-vue3'

const props = defineProps<{
  modelValue: string
}>()

const emits = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  }
})

const cmRef = ref()

const cmOptions = reactive({
  mode: 'text/javascript',
  lineNumbers: true, // Show line number
  smartIndent: true, // Smart indent
  indentUnit: 4, // The smart indent unit is 2 spaces in length
  foldGutter: true, // Code folding
  matchBrackets: true,
  autoCloseBrackets: true,
  styleActiveLine: true, // Display the style of the selected row
  readOnly: false
  // theme: 'neo'
})

onMounted(() => {
  // code.value = vueEditStr(JSON.stringify(props.schema, null, 2))
  cmRef.value.refresh()
})

onUnmounted(() => {
  cmRef.value?.destroy()
})
</script>
