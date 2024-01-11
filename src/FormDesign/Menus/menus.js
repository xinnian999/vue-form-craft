import {
  input,
  textarea,
  select,
  radio,
  checkbox,
  cascader,
  inputNumber,
  switch as switchConfig,
  jsonEdit,
  colorPicker,
  formList,
  itemGroup,
  button,
  card,
  password,
  inline,
  markdown,
  alert,
  datePicker
} from '../elements'

const menus = [
  {
    title: '基础字段',
    children: [
      input,
      textarea,
      password,
      select,
      radio,
      checkbox,
      cascader,
      inputNumber,
      switchConfig,
      jsonEdit,
      colorPicker,
      datePicker,
      markdown
    ]
  },
  {
    title: '高级字段',
    children: [formList, itemGroup]
  },
  {
    title: '布局字段',
    children: [card, inline]
  },
  {
    title: '功能字段',
    children: [button, alert]
  }
]

export default menus