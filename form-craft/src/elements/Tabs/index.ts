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
        { label: '选项卡1', name: 'name1', component: 'TabPane', children: [], designKey: 'tab-1' },
        { label: '选项卡2', name: 'name2', component: 'TabPane', children: [], designKey: 'tab-2' }
      ],
      props: {
        defaultKey: 'name1',
        tabPosition: 'top'
      }
    },
    items: [
      { label: '唯一标识', component: 'Input', name: 'name' },
      {
        label: '默认选项卡',
        component: 'Select',
        name: 'props.defaultKey',
        props: {
          mode: 'static',
          options: '{{$values.children}}',
          labelKey: 'label',
          valueKey: 'name'
        }
      },
      {
        label: '选项卡风格',
        component: 'Radio',
        name: 'props.type',
        props: {
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
        name: 'props.tabPosition',
        props: {
          mode: 'static',
          optionType: 'button',
          space: 0,
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
            props: {
              placeholder: '请输入标题'
            },
            name: 'label',
            initialValue: '{{ "选项卡" + ($index + 1) }}'
          },
          {
            label: '唯一标识',
            component: 'Input',
            props: {
              placeholder: '请输入唯一标识'
            },
            name: 'name',
            initialValue: '{{ "name" + ($index + 1) }}'
          },
          {
            label: '禁用',
            component: 'Switch',
            props: {
              'inline-prompt': false
            },
            name: 'disabled'
          },
          {
            label: '懒加载',
            component: 'Switch',
            props: {
              'inline-prompt': false
            },
            name: 'lazy'
          }
        ],
        props: {
          mode: 'card',
          title: '选项卡'
        },
        name: 'children'
      }
    ]
  }
} satisfies FormElement
