<template>
  <Codemirror v-model:value="code" :options="cmOptions" border ref="cmRef"> </Codemirror>
</template>
<script setup>
import { ref, reactive, onMounted, onUnmounted, inject } from 'vue'
import 'codemirror/mode/javascript/javascript.js'
import Codemirror from 'codemirror-editor-vue3'
import 'codemirror/theme/ayu-mirage.css'
import 'codemirror/theme/neo.css'
import vueEditStr from './vueEditStr'

const code = ref('')

const schema = inject('$schema')

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
  // theme:'ayu-mirage',
  // theme:'neo',
})

onMounted(() => {
  code.value = vueEditStr(JSON.stringify(schema.value, null, 2))
  cmRef.value.refresh()
})

onUnmounted(() => {
  cmRef.value?.destroy()
})
</script>
