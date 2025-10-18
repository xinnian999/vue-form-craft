import type { CompletionItem } from '@/types/complete'

/** 表单全局配置补全项 */
export const FORM_CONFIG_ITEMS: CompletionItem[] = [
  { name: 'labelWidth', meta: '表单label宽度', score: 1000 },
  {
    name: 'labelAlign',
    meta: '表单label对齐方式',
    score: 999,
    enum: [
      { name: 'left', meta: '左对齐', score: 1000 },
      { name: 'right', meta: '右对齐', score: 999 },
      { name: 'top', meta: '顶部对齐', score: 998 }
    ]
  },
  { name: 'labelSuffix', meta: '表单label后缀', score: 998 },
  {
    name: 'labelBold',
    meta: '是否加粗label',
    score: 997,
    enum: [
      { name: 'true', meta: '加粗', score: 1000 },
      { name: 'false', meta: '不加粗', score: 999 }
    ]
  },
  {
    name: 'size',
    meta: '表单项大小',
    score: 996,
    enum: [
      { name: 'default', meta: '默认大小', score: 1000 },
      { name: 'small', meta: '小尺寸', score: 999 },
      { name: 'large', meta: '大尺寸', score: 998 }
    ]
  },
  {
    name: 'hideRequiredAsterisk',
    meta: '是否隐藏必填星号',
    score: 995,
    enum: [
      { name: 'true', meta: '隐藏星号', score: 1000 },
      { name: 'false', meta: '显示星号', score: 999 }
    ]
  },
  {
    name: 'disabled',
    meta: '是否禁用整个表单',
    score: 994,
    enum: [
      { name: 'true', meta: '禁用', score: 1000 },
      { name: 'false', meta: '启用', score: 999 }
    ]
  },
  {
    name: 'scrollToError',
    meta: '是否滚动到错误字段',
    score: 993,
    enum: [
      { name: 'true', meta: '自动滚动', score: 1000 },
      { name: 'false', meta: '不滚动', score: 999 }
    ]
  },
  { name: 'items', meta: '表单项配置数组', score: 992 },
  { name: 'initialValues', meta: '表单初始值', score: 991 },
  {
    name: 'submitBtn',
    meta: '是否显示提交按钮',
    score: 990,
    enum: [
      { name: 'true', meta: '显示提交按钮', score: 1000 },
      { name: 'false', meta: '隐藏提交按钮', score: 999 }
    ]
  },
  {
    name: 'resetBtn',
    meta: '是否显示重置按钮',
    score: 989,
    enum: [
      { name: 'true', meta: '显示重置按钮', score: 1000 },
      { name: 'false', meta: '隐藏重置按钮', score: 999 }
    ]
  }
]

/** 表单项配置补全项 */
export const FORM_ITEM_CONFIG_ITEMS: CompletionItem[] = [
  { name: 'label', meta: '表单项标签', score: 1000 },
  { name: 'name', meta: '表单项唯一标识', score: 999 },
  { name: 'component', meta: '组件类型', score: 998 },
  { name: 'props', meta: '组件属性', score: 997 },
  {
    name: 'required',
    meta: '是否必填',
    score: 996,
    enum: [
      { name: 'true', meta: '必填项', score: 1000 },
      { name: 'false', meta: '非必填', score: 999 }
    ]
  },
  { name: 'initialValue', meta: '初始值', score: 995 },
  { name: 'help', meta: '提示信息', score: 994 },
  {
    name: 'hidden',
    meta: '是否隐藏',
    score: 993,
    enum: [
      { name: 'true', meta: '隐藏字段', score: 1000 },
      { name: 'false', meta: '显示字段', score: 999 }
    ]
  },
  {
    name: 'hideLabel',
    meta: '是否隐藏标签',
    score: 992,
    enum: [
      { name: 'true', meta: '隐藏标签', score: 1000 },
      { name: 'false', meta: '显示标签', score: 999 }
    ]
  },
  { name: 'rules', meta: '校验规则', score: 991 },
  { name: 'children', meta: '子表单项', score: 990 },
  { name: 'change', meta: '联动配置', score: 989 },
  { name: 'designKey', meta: '设计器标识', score: 988 },
  { name: 'class', meta: 'CSS类名', score: 987 },
  { name: 'style', meta: '内联样式', score: 986 },
  { name: 'width', meta: '宽度', score: 985 },
  {
    name: 'dialog',
    meta: '是否弹窗',
    score: 984,
    enum: [
      { name: 'true', meta: '弹窗模式', score: 1000 },
      { name: 'false', meta: '内联模式', score: 999 }
    ]
  }
]

/** 表达式变量补全项 */
export const EXPRESSION_ITEMS: CompletionItem[] = [
  { name: '$values', meta: '表单数据对象', score: 1000 },
  { name: '$values.', meta: '访问表单字段', score: 999 }
]

/** 组件类型补全项 */
export const COMPONENT_ITEMS: CompletionItem[] = [
  { name: 'Input', meta: '输入框', score: 1000 },
  { name: 'Password', meta: '密码框', score: 999 },
  { name: 'TextArea', meta: '文本域', score: 998 },
  { name: 'InputNumber', meta: '数字输入框', score: 997 },
  { name: 'Select', meta: '选择器', score: 996 },
  { name: 'Radio', meta: '单选框', score: 995 },
  { name: 'Checkbox', meta: '多选框', score: 994 },
  { name: 'Switch', meta: '开关', score: 993 },
  { name: 'DatePicker', meta: '日期选择器', score: 992 },
  { name: 'TimePicker', meta: '时间选择器', score: 991 },
  { name: 'Rate', meta: '评分', score: 990 },
  { name: 'Slider', meta: '滑块', score: 989 }
]
