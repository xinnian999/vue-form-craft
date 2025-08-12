import type { Locale } from '@vue-form-craft/types'

export default {
  menus: {
    basicTitle: 'Basic Fields',
    highTitle: 'High Basic Fields',
    layoutTitle: 'Layout Fields',
    assistTitle: 'Assist Fields',
    useTemplateBtn: 'Use Template'
  },
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
} satisfies Locale
