<template>
  <div v-if="formInstance.read" :class="ns('code-editor-read')">
    <pre>{{ value }}</pre>
  </div>
  <div v-else :class="ns('code-editor-wrapper')">
    <vue-monaco-editor
      v-model:value="value"
      :language="language"
      :theme="theme"
      :options="editorOptions"
      :height="height"
      @mount="handleMount"
    />
  </div>
</template>

<script setup lang="ts">
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'
import { computed } from 'vue'
import { useFormInstance } from '@/hooks'
import { ns } from '@/utils'

const value = defineModel<string>()

const formInstance = useFormInstance()

const props = withDefaults(
  defineProps<{
    language?: string
    theme?: string
    height?: string | number
    readOnly?: boolean
    minimap?: boolean
    lineNumbers?: 'on' | 'off' | 'relative' | 'interval'
    fontSize?: number
    tabSize?: number
    wordWrap?: 'on' | 'off' | 'wordWrapColumn' | 'bounded'
    onMount?: (editor: any) => void
  }>(),
  {
    language: 'javascript',
    theme: 'vs',
    height: '300px',
    readOnly: false,
    minimap: false,
    lineNumbers: 'on',
    fontSize: 14,
    tabSize: 2,
    wordWrap: 'off'
  }
)

const editorOptions = computed(() => ({
  readOnly: props.readOnly,
  minimap: { enabled: props.minimap },
  lineNumbers: props.lineNumbers,
  fontSize: props.fontSize,
  tabSize: props.tabSize,
  wordWrap: props.wordWrap,
  automaticLayout: true,
  scrollBeyondLastLine: false,
  folding: true,
  glyphMargin: false,
  lineDecorationsWidth: 10,
  lineNumbersMinChars: 3
}))

const emit = defineEmits<{
  mount: [editor: any]
}>()

const handleMount = (editor: any) => {
  // 编辑器挂载后的回调
  emit('mount', editor)

  // 如果有自定义的 onMount 回调，执行它
  if (props.onMount) {
    props.onMount(editor)
  }
}
</script>

<style scoped lang="scss">
@import '@/style.scss';

@include ns('code-editor-wrapper') {
  width: 100%;
  border: 1px solid $borderColor;
  border-radius: 4px;
  overflow: hidden;
  background-color: $bgColor;
}

@include ns('code-editor-read') {
  padding: 12px;
  background-color: $bgColor3;
  border: 1px solid $borderColor;
  border-radius: 4px;
  max-height: 400px;
  overflow: auto;

  pre {
    margin: 0;
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    color: $textColor1;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}
</style>
