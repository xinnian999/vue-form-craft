import type { Locale } from './commonType'

export default {
  zh: {
    actions: {
      previewJson: '预览JSON脚本',
      previewVueCode: '生成VUE代码',
      previewForm: '预览表单',
      clear: '清空',
      save: '保存'
    },
    canvas: {
      emptyTip: '请从左侧拖拽字段来组成表单',
      wrapperEmptyTip: '请拖入子字段'
    },
    attr: {
      tab1: {
        title: '字段配置',
        emptyTip: '未选中字段',
        linkage: {
          text: '联动',
          action1: '配置项联动',
          action2: '值联动'
        }
      },
      tab2: {
        title: '表单设置'
      }
    }
  },
  en: {
    actions: {
      previewJson: 'Preview JSON Script',
      previewVueCode: 'Generate VUE code',
      previewForm: 'Preview Form',
      clear: 'Clear',
      save: 'Save'
    },
    canvas: {
      emptyTip: 'Please drag and drop fields from the left to form a form',
      wrapperEmptyTip: 'Please drag in a subfield'
    },
    attr: {
      tab1: {
        title: 'Field Configuration',
        emptyTip: 'No field selected',
        linkage: {
          text: 'Linkage',
          action1: 'Configuration Item Linkage',
          action2: 'Value Linkage'
        }
      },
      tab2: {
        title: 'Form Settings'
      }
    }
  }
} satisfies Record<string, Locale>
