import type { Locale } from '@vue-form-craft/core'

export default {
  menus: {
    basicTitle: '基础组件',
    highTitle: '高级组件',
    layoutTitle: '布局组件',
    assistTitle: '辅助组件',
    useTemplateBtn: '使用模板'
  },
  actions: {
    previewJson: '导出',
    previewVueCode: '生成VUE代码',
    previewForm: '预览',
    clear: '清空',
    save: '保存'
  },
  canvas: {
    emptyTip: '请从左侧拖拽表单项来组成表单',
    wrapperEmptyTip: '请拖入子表单项'
  },
  attr: {
    tab1: {
      title: '表单项配置',
      emptyTip: '未选中表单项',
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
