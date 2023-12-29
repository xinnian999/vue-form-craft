export default [
  {
    title: '基础字段',
    children: [
      { label: '单行文本', component: 'input', props: {} },
      {
        label: '多行文本',
        component: 'textarea',
        props: {
          autosize: { minRows: 4, maxRows: 999 }
        }
      },
      { label: '密码输入框', component: 'password', props: {} },
      {
        label: '下拉选择框',
        component: 'select',
        props: {
          mode: 'static',
          options: [
            { label: '选项1', value: 'value1' },
            { label: '选项2', value: 'value2' },
            { label: '选项3', value: 'value3' }
          ],
          columns: [
            { title: 'label', dataIndex: 'label' },
            { title: 'value', dataIndex: 'value' }
          ]
        }
      },
      {
        label: '单选框组',
        component: 'radio',
        props: {
          mode: 'static',
          options: [
            { label: '选项1', value: 'value1' },
            { label: '选项2', value: 'value2' },
            { label: '选项3', value: 'value3' }
          ]
        }
      },
      {
        label: '多选框组',
        component: 'checkbox',
        props: {
          mode: 'static',
          options: [
            { label: '选项1', value: 'value1' },
            { label: '选项2', value: 'value2' },
            { label: '选项3', value: 'value3' }
          ]
        }
      },
      {
        label: '级联选择器',
        component: 'cascader',
        props: {
          mode: 'static',
          options: [
            {
              label: 666,
              value: 666,
              children: [
                {
                  label: '666a',
                  value: '666a'
                }
              ]
            },
            {
              label: 777,
              value: 777
            }
          ]
        }
      },
      { label: '计数器', component: 'inputNumber' },
      { label: '开关', component: 'switch' },
      { label: 'JSON编辑器', component: 'jsonEdit' },
      { label: '颜色选择器', component: 'colorPicker' }
    ]
  },
  {
    title: '高级字段',
    children: [
      {
        label: '自增容器',
        component: 'formList',
        children: []
      },
      {
        label: '字段组',
        component: 'itemGroup',
        children: []
      }
    ]
  },
  {
    title: '布局字段',
    children: [
      {
        label: '卡片',
        component: 'card',
        children: []
      }
    ]
  }
]
