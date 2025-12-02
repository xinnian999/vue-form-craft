import { config } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import { vi } from 'vitest'
import * as elements from '@/elements'
import { $globals } from '@/symbol'

// Mock Monaco Editor - vi.mock 会被提升，所以需要在内部定义
vi.mock('@guolao/vue-monaco-editor', () => {
  const MockMonacoEditor = {
    name: 'MonacoEditor',
    template: '<div class="monaco-editor-mock"></div>',
    props: ['modelValue', 'language', 'theme', 'options'],
    emits: ['update:modelValue']
  }

  return {
    default: MockMonacoEditor,
    VueMonacoEditor: MockMonacoEditor,
    useMonaco: () => ({
      monacoRef: { value: null },
      unload: () => {},
      isLoadFailed: { value: false }
    }),
    loader: {
      __getMonacoInstance: () => null
    }
  }
})

config.global.plugins = [ElementPlus]
config.global.provide = {
  [$globals]: {
    lang: 'zh',
    elements
  }
}
