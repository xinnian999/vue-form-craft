import type { Locale } from '@form-magic/core'

export default {
  menus: {
    basicTitle: '基础组件',
    highTitle: '高级组件',
    layoutTitle: '布局组件',
    assistTitle: '辅助组件',
    useTemplateBtn: '使用模板'
  },
  actions: {
    previewJson: '生成JSON Schema',
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
        action1: '配置联动',
        action2: '数据联动'
      }
    },
    tab2: {
      title: '表单设置'
    }
  }
} satisfies Locale
