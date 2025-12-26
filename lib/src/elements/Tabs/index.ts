import type { FormElement } from '@/types'
import Tabs from './Tabs.vue'

export default {
  title: '选项卡',
  component: 'Tabs',
  render: Tabs,
  icon: 'tabs',
  type: 'layout',
  order: 4,
  attrSchema: {
    size: 'small',
    labelAlign: 'top',
    initialValues: {
      children: [
        { label: '选项卡1', name: 'name1', component: 'TabPane', children: [] },
        { label: '选项卡2', name: 'name2', component: 'TabPane', children: [] }
      ],
      componentProps: {
        defaultKey: 'name1',
        tabPosition: 'top'
      }
    },
    items: [
      { label: '唯一标识', component: 'Input', name: 'name' },
      {
        label: '默认选项卡',
        component: 'Select',
        name: 'componentProps.defaultKey',
        componentProps: {
          mode: 'static',
          options: '{{$values.children}}',
          labelKey: 'label',
          valueKey: 'name'
        }
      },
      {
        label: '选项卡风格',
        component: 'Radio',
        name: 'componentProps.type',
        componentProps: {
          mode: 'static',
          options: [
            { label: '风格1', value: '' },
            { label: '风格2', value: 'card' },
            { label: '风格3', value: 'border-card' }
          ]
        }
      },
      {
        label: '选项卡所在位置',
        component: 'Radio',
        name: 'componentProps.tabPosition',
        componentProps: {
          mode: 'static',
          type: 'button',
          options: [
            { label: '上', value: 'top' },
            { label: '右', value: 'right' },
            { label: '下', value: 'bottom' },
            { label: '左', value: 'left' }
          ]
        }
      },
      {
        label: '子选项卡配置',
        component: 'FormList',
        children: [
          {
            label: '标题',
            component: 'Input',
            componentProps: {
              placeholder: '请输入标题'
            },
            name: 'label'
          },
          {
            label: '唯一标识',
            component: 'Input',
            componentProps: {
              placeholder: '请输入唯一标识'
            },
            name: 'name'
          },
          {
            label: '禁用',
            component: 'Switch',
            componentProps: {
              'inline-prompt': false
            },
            name: 'disabled'
          },
          {
            label: '懒加载',
            component: 'Switch',
            componentProps: {
              'inline-prompt': false
            },
            name: 'componentProps.lazy'
          }
        ],
        componentProps: {
          mode: 'card',
          title: '选项卡',
          getNewItem:
            '{{ (index) => { return { label: "选项卡" + index, name: "name" + index } } }}'
        },
        name: 'children'
      }
    ]
  }
} satisfies FormElement
