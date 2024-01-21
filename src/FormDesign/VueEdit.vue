<template>
  <Codemirror
    v-model:value="code"
    :options="cmOptions"
    border
    ref="cmRef"
    height="400"
    width="600"
    @change="onChange"
    @input="onInput"
    @ready="onReady"
  >
  </Codemirror>
  <!-- <el-button type="primary" @click="handleSave">保存</el-button> -->
</template>
<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import 'codemirror/mode/javascript/javascript.js'
import Codemirror from 'codemirror-editor-vue3'
import 'codemirror/theme/ayu-mirage.css'
import 'codemirror/theme/neo.css'
const code = ref(
  `var i = 0;
  for (; i < 9; i++) {
      console.log(i);
      // more statements
  }
  `
)

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
const onChange = (val, cm) => {
  console.log(val)
  console.log(cm.getValue())
}

const onInput = (val) => {
  console.log(val)
}

const onReady = (cm) => {
  console.log(cm.focus())
}
onMounted(() => {
  setTimeout(() => {
    cmRef.value?.refresh()
  }, 1000)

  setTimeout(() => {
    // cmRef.value?.resize(300, 200)
  }, 2000)

  setTimeout(() => {
    cmRef.value?.cminstance.isClean()
  }, 3000)
})

onUnmounted(() => {
  cmRef.value?.destroy()
})
function handleSave() {
  console.log('codeValue: ')
  console.log(code.value)
}
</script>
