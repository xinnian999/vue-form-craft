<template>
  <Codemirror v-model:value="code" :options="cmOptions" border ref="cmRef"> </Codemirror>
</template>
<script setup>
import { ref, reactive, onMounted, onUnmounted, defineProps } from 'vue'
import 'codemirror/mode/javascript/javascript.js'
import Codemirror from 'codemirror-editor-vue3'
import vueEditStr from '@/config/vueEditStr'

const props = defineProps({
  schema: Object,
  readOnly: Boolean
})

const code = ref('')

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
  readOnly: props.readOnly
  // theme: 'neo'
})

onMounted(() => {
  code.value = vueEditStr(JSON.stringify(props.schema, null, 2))
  cmRef.value.refresh()
})

onUnmounted(() => {
  cmRef.value?.destroy()
})
</script>
