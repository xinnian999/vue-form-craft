import {
  Modal as AntModal,
  Button,
  Card,
  Checkbox,
  Collapse,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  Tabs
} from 'ant-design-vue'
import { omit } from 'lodash'
import { defineComponent, h, ref } from 'vue'
import type {
  ButtonProtocol,
  CardProtocol,
  CheckboxGroupProtocol,
  CollapseItemProtocol,
  CollapseProtocol,
  ColorPickerProtocol,
  DatePickerProtocol,
  FormItemProtocol,
  FormProtocol,
  InputNumberProtocol,
  InputProtocol,
  MessageBoxOptions,
  MessageOptions,
  ModalProtocol,
  RadioGroupProtocol,
  RateProtocol,
  SelectProtocol,
  SliderProtocol,
  SwitchProtocol,
  TabPaneProtocol,
  TabsProtocol,
  TextareaProtocol,
  UIAdapter
} from '@/types/uiAdapter'
import ns from '@/utils/ns'

const { TextArea } = Input
const { Item: FormItem } = Form
const { TabPane } = Tabs
const { Panel: CollapsePanel } = Collapse
const { Option: SelectOption } = Select
const { Group: RadioGroup } = Radio
const { Group: CheckboxGroup } = Checkbox

/**
 * Ant Design Vue UI适配器
 */
const AntdAdapter: UIAdapter = {
  injectCssVars: () => {
    const el = document.documentElement
    const style = el.style

    // 主色
    style.setProperty(`--${ns('color-primary')}`, '#1677ff')
    style.setProperty(`--${ns('color-primary-light')}`, '#e6f4ff')

    // 语义色
    style.setProperty(`--${ns('color-success')}`, '#52c41a')
    style.setProperty(`--${ns('color-success-light')}`, '#f6ffed')
    style.setProperty(`--${ns('color-warning')}`, '#faad14')
    style.setProperty(`--${ns('color-danger')}`, '#ff4d4f')

    // 背景 / 边框
    style.setProperty(`--${ns('color-bg')}`, '#ffffff')
    style.setProperty(`--${ns('color-bg-secondary')}`, '#ffffff')
    style.setProperty(`--${ns('color-bg-soft')}`, '#f5f5f5')
    style.setProperty(`--${ns('color-border')}`, '#d9d9d9')
    style.setProperty(`--${ns('color-fill-light')}`, '#f5f5f5')

    // 文本
    style.setProperty(`--${ns('color-text-primary')}`, 'rgba(0, 0, 0, 0.88)')
    style.setProperty(`--${ns('color-text-regular')}`, 'rgba(0, 0, 0, 0.65)')
    style.setProperty(`--${ns('color-text-secondary')}`, 'rgba(0, 0, 0, 0.45)')
  },

  Form: defineComponent(
    (_, { slots, attrs, expose }) => {
      const propsAttrs = attrs as FormProtocol['props']
      const formRef = ref()

      // 暴露底层 Ant Design Vue Form 的所有方法
      expose({
        validate: (...args: any[]) => formRef.value?.validate(...args),
        validateFields: (...args: any[]) => formRef.value?.validateFields(...args),
        resetFields: (...args: any[]) => formRef.value?.resetFields(...args),
        scrollToField: (...args: any[]) => formRef.value?.scrollToField(...args),
        clearValidate: (...args: any[]) => formRef.value?.clearValidate(...args)
      })

      return () =>
        h(
          Form,
          {
            ref: formRef,
            ...omit(attrs, ['scrollToError', 'labelWidth']),
            colon: false,
            scrollToFirstError: propsAttrs.scrollToError,
            layout: propsAttrs.inline
              ? 'inline'
              : propsAttrs.labelAlign === 'top'
                ? 'vertical'
                : 'horizontal',
            labelCol: propsAttrs.labelWidth
              ? {
                  style: {
                    width:
                      typeof propsAttrs.labelWidth === 'number'
                        ? `${propsAttrs.labelWidth}px`
                        : propsAttrs.labelWidth
                  }
                }
              : undefined
          },
          slots
        )
    },
    { inheritAttrs: false }
  ),

  FormItem: defineComponent(
    (_, { slots, attrs }) => {
      const propsAttrs = attrs as FormItemProtocol['props']

      return () => {
        const { labelWidth } = propsAttrs

        // 计算 labelCol 配置
        let labelCol
        if (labelWidth && labelWidth !== 0) {
          const width = typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth
          labelCol = { style: { width } }
        }
        if (labelWidth === 0) {
          labelCol = { style: { width: 0 } }
        }

        return h(
          FormItem,
          {
            ...attrs,
            colon: false,
            name: propsAttrs.prop,
            labelCol
          },
          slots
        )
      }
    },
    { inheritAttrs: false }
  ),
  Input: defineComponent(
    (_, { slots, attrs }) => {
      const propsAttrs = attrs as InputProtocol['props']

      return () =>
        h(
          Input,
          {
            ...attrs,
            value: propsAttrs.modelValue,
            'onUpdate:value': (value: string) => {
              propsAttrs['onUpdate:modelValue']?.(value)
            },
            allowClear: propsAttrs.clearable
          },
          slots
        )
    },
    { inheritAttrs: false }
  ),

  Textarea: defineComponent(
    (_, { slots, attrs }) => {
      const propsAttrs = attrs as TextareaProtocol['props']

      return () =>
        h(
          TextArea,
          {
            ...attrs,
            value: propsAttrs.modelValue,
            'onUpdate:value': (value: string) => {
              propsAttrs['onUpdate:modelValue']?.(value)
            },
            allowClear: propsAttrs.clearable,
            showCount: propsAttrs.showWordLimit,
            maxLength: propsAttrs.maxlength,
            autoSize: propsAttrs.autosize
          },
          slots
        )
    },
    { inheritAttrs: false }
  ),

  Select: defineComponent(
    (_, { slots, attrs }) => {
      const propsAttrs = attrs as SelectProtocol['props']

      return () =>
        h(
          Select as any,
          {
            ...attrs,
            value: propsAttrs.modelValue,
            'onUpdate:value': (value: any) => {
              propsAttrs['onUpdate:modelValue']?.(value)
            },
            allowClear: propsAttrs.clearable,
            showSearch: propsAttrs.filterable,
            mode: propsAttrs.multiple ? 'multiple' : undefined,
            loading: propsAttrs.loading
          },
          propsAttrs.options
            ? {
                default: () =>
                  propsAttrs.options!.map((option) =>
                    h(SelectOption as any, {
                      key: option.value,
                      value: option.value,
                      disabled: option.disabled,
                      label: option.label
                    })
                  ),
                ...slots
              }
            : slots
        )
    },
    { inheritAttrs: false }
  ),

  Card: defineComponent(
    (_, { slots, attrs }) => {
      const propsAttrs = attrs as CardProtocol['props']

      return () =>
        h(
          Card,
          {
            ...attrs,
            title: propsAttrs.header,
            hoverable: propsAttrs.shadow === 'hover',
            bodyStyle: propsAttrs.bodyStyle
          },
          slots
        )
    },
    { inheritAttrs: false }
  ),

  Tabs: defineComponent(
    (_, { slots, attrs }) => {
      const propsAttrs = attrs as TabsProtocol['props']

      return () =>
        h(
          Tabs as any,
          {
            activeKey: propsAttrs.modelValue,
            'onUpdate:activeKey': (value: string | number) => {
              propsAttrs['onUpdate:modelValue']?.(value)
            },
            type: propsAttrs.type === 'border-card' ? 'card' : propsAttrs.type,
            tabPosition: propsAttrs.tabPosition,
            onChange: (activeKey: string | number) => {
              propsAttrs.onTabChange?.(activeKey)
            }
          },
          {
            default: () => {
              const nodes = slots.default?.() as any

              const parseNodeProps = (node: any) => {
                console.log(node)

                node.props.tab = node.props.label
                node.props.key = node.props.name
                node.children.tab = node.children.label
              }

              nodes?.forEach((node: any) => {
                if (node.props) {
                  parseNodeProps(node)
                } else {
                  node.children?.forEach((child: any) => {
                    if (child.props) {
                      parseNodeProps(child)
                    }
                  })
                }
              })

              return nodes
            }
          }
        )
    },
    { inheritAttrs: false }
  ),

  TabPane: defineComponent(
    (_, { slots, attrs }) => {
      const propsAttrs = attrs as TabPaneProtocol['props']

      return () => h(TabPane as any, propsAttrs, slots)
    },
    { inheritAttrs: false }
  ),

  Collapse: defineComponent(
    (_, { slots, attrs }) => {
      const propsAttrs = attrs as CollapseProtocol['props']

      return () =>
        h(
          Collapse as any,
          {
            activeKey: propsAttrs.modelValue,
            'onUpdate:activeKey': (value: string | number | Array<string | number>) => {
              propsAttrs['onUpdate:modelValue']?.(value)
            },
            accordion: propsAttrs.accordion,
            onChange: (value: string | number | Array<string | number>) => {
              propsAttrs.onChange?.(value)
            }
          },
          {
            default: () => {
              const nodes = slots.default?.() as any

              const parseNodeProps = (node: any) => {
                node.props.header = node.props.title
                node.props.key = node.props.name
              }

              nodes?.forEach((node: any) => {
                if (node.props) {
                  parseNodeProps(node)
                } else {
                  node.children?.forEach((child: any) => {
                    if (child.props) {
                      parseNodeProps(child)
                    }
                  })
                }
              })

              return nodes
            }
          }
        )
    },
    { inheritAttrs: false }
  ),

  CollapseItem: defineComponent(
    (_, { slots, attrs }) => {
      const propsAttrs = attrs as CollapseItemProtocol['props']

      return () => h(CollapsePanel as any, propsAttrs, slots)
    },
    { inheritAttrs: false }
  ),

  Button: defineComponent(
    (_, { slots, attrs }) => {
      const propsAttrs = attrs as ButtonProtocol['props']

      return () => {
        // type 适配: text -> link, warning -> default (Ant Design Vue 不支持 warning 和 info)
        let buttonType: 'primary' | 'dashed' | 'link' | 'text' | 'default' | undefined
        if (propsAttrs.type === 'text') {
          buttonType = 'link'
        } else if (propsAttrs.type === 'warning' || propsAttrs.type === 'info') {
          buttonType = 'default'
        } else if (propsAttrs.type === 'danger') {
          buttonType = undefined
        } else {
          buttonType = propsAttrs.type as 'primary' | 'dashed' | 'link' | 'text' | 'default'
        }

        return h(
          Button,
          {
            ...attrs,
            type: buttonType,
            danger: propsAttrs.type === 'danger',
            shape: propsAttrs.circle ? 'circle' : propsAttrs.round ? 'round' : undefined
          },
          {
            ...slots,
            icon: () => h('span', { class: slots.icon && 'anticon' }, slots.icon?.())
          }
        )
      }
    },
    { inheritAttrs: false }
  ),

  Modal: defineComponent(
    (_, { slots, attrs }) => {
      const propsAttrs = attrs as ModalProtocol['props']

      return () => {
        // 处理 to 参数：优先使用 to，默认为 body
        let getContainer: (() => HTMLElement) | undefined
        if (propsAttrs.to) {
          if (typeof propsAttrs.to === 'string') {
            getContainer = () => document.querySelector(propsAttrs.to as string) || document.body
          } else {
            getContainer = () => propsAttrs.to as HTMLElement
          }
        } else {
          getContainer = () => document.body
        }

        return h(
          Modal,
          {
            ...attrs,
            open: propsAttrs.modelValue,
            'onUpdate:open': (value: boolean) => {
              propsAttrs['onUpdate:modelValue']?.(value)
            },
            centered: propsAttrs.center,
            maskClosable: propsAttrs.closeOnClickModal,
            keyboard: propsAttrs.closeOnPressEscape,
            getContainer,
            destroyOnClose: propsAttrs.destroyOnClose,
            // 如果没有传递 footer 插槽，设置 footer: null 隐藏默认 footer，保持与 Element Plus 行为一致
            footer: slots.footer ? undefined : null,
            onOk: propsAttrs.onClose,
            onCancel: propsAttrs.onClose
          },
          slots
        )
      }
    },
    { inheritAttrs: false }
  ),

  RadioGroup: defineComponent(
    (_, { slots, attrs }) => {
      const propsAttrs = attrs as RadioGroupProtocol['props']

      return () =>
        h(
          RadioGroup as any,
          {
            ...attrs,
            value: propsAttrs.modelValue,
            optionType: attrs.isButtonOption ? 'button' : 'default',
            'onUpdate:value': (value: any) => {
              propsAttrs['onUpdate:modelValue']?.(value)
            }
          },
          slots
        )
    },
    { inheritAttrs: false }
  ),

  CheckboxGroup: defineComponent(
    (_, { slots, attrs }) => {
      const propsAttrs = attrs as CheckboxGroupProtocol['props']

      return () =>
        h(
          CheckboxGroup as any,
          {
            ...attrs,
            optionType: attrs.isButtonOption ? 'button' : 'default',
            value: propsAttrs.modelValue,
            'onUpdate:value': (value: any[]) => {
              propsAttrs['onUpdate:modelValue']?.(value)
            }
          },
          slots
        )
    },
    { inheritAttrs: false }
  ),

  Switch: defineComponent(
    (_, { attrs }) => {
      const propsAttrs = attrs as SwitchProtocol['props']

      return () =>
        h(Switch as any, {
          ...attrs,
          checked: propsAttrs.modelValue,
          'onUpdate:checked': (value: boolean) => {
            propsAttrs['onUpdate:modelValue']?.(value)
          },
          checkedChildren: propsAttrs.activeText,
          unCheckedChildren: propsAttrs.inactiveText
        })
    },
    { inheritAttrs: false }
  ),

  InputNumber: defineComponent(
    (_, { attrs }) => {
      const propsAttrs = attrs as InputNumberProtocol['props']

      return () =>
        h(InputNumber as any, {
          ...attrs,
          value: propsAttrs.modelValue,
          'onUpdate:value': (value: number | undefined) => {
            propsAttrs['onUpdate:modelValue']?.(value)
          }
        })
    },
    { inheritAttrs: false }
  ),

  Slider: defineComponent(
    (_, { attrs }) => {
      const propsAttrs = attrs as SliderProtocol['props']

      return () =>
        h(Slider as any, {
          ...attrs,
          value: propsAttrs.modelValue,
          'onUpdate:value': (value: number | [number, number]) => {
            propsAttrs['onUpdate:modelValue']?.(value)
          }
        })
    },
    { inheritAttrs: false }
  ),

  Rate: defineComponent(
    (_, { attrs }) => {
      const propsAttrs = attrs as RateProtocol['props']

      return () =>
        h(Rate as any, {
          ...attrs,
          value: propsAttrs.modelValue,
          'onUpdate:value': (value: number) => {
            propsAttrs['onUpdate:modelValue']?.(value)
          },
          count: propsAttrs.max
        })
    },
    { inheritAttrs: false }
  ),

  ColorPicker: defineComponent(
    (_, { attrs }) => {
      const propsAttrs = attrs as ColorPickerProtocol['props']

      return () =>
        h('div', { style: 'color: #999; font-size: 12px;' }, [
          h('input', {
            type: 'color',
            value: propsAttrs.modelValue || '#000000',
            disabled: propsAttrs.disabled,
            onInput: (e: Event) => {
              const value = (e.target as HTMLInputElement).value
              propsAttrs['onUpdate:modelValue']?.(value)
              propsAttrs.onChange?.(value)
            },
            style:
              'width: 40px; height: 32px; border: 1px solid #d9d9d9; border-radius: 2px; cursor: pointer;'
          }),
          h(
            'span',
            { style: 'margin-left: 8px; font-size: 12px;' },
            '(Ant Design Vue 不支持 ColorPicker，使用原生 input[type=color])'
          )
        ])
    },
    { inheritAttrs: false }
  ),

  DatePicker: defineComponent(
    (_, { attrs }) => {
      const propsAttrs = attrs as DatePickerProtocol['props']

      return () => {
        const isRangePicker =
          propsAttrs.type === 'daterange' ||
          propsAttrs.type === 'monthrange' ||
          propsAttrs.type === 'datetimerange'

        const DatePickerComponent = isRangePicker ? DatePicker.RangePicker : DatePicker

        let picker: 'date' | 'week' | 'month' | 'quarter' | 'year' | undefined
        if (propsAttrs.type === 'year') {
          picker = 'year'
        } else if (propsAttrs.type === 'month' || propsAttrs.type === 'monthrange') {
          picker = 'month'
        } else if (propsAttrs.type === 'week') {
          picker = 'week'
        }

        const showTime = propsAttrs.type === 'datetime' || propsAttrs.type === 'datetimerange'

        return h(DatePickerComponent as any, {
          ...attrs,
          value: propsAttrs.modelValue,
          'onUpdate:value': (value: any) => {
            propsAttrs['onUpdate:modelValue']?.(value)
          },
          picker,
          showTime,
          format: propsAttrs.format,
          valueFormat: propsAttrs.valueFormat,
          placeholder: propsAttrs.type?.includes('range')
            ? [propsAttrs.startPlaceholder, propsAttrs.endPlaceholder]
            : propsAttrs.placeholder
        })
      }
    },
    { inheritAttrs: false }
  ),

  Message: {
    success: (msg: string, options?: MessageOptions) => {
      message.success({
        content: msg,
        duration: options?.duration ? options.duration / 1000 : 3
      })
    },
    warning: (msg: string, options?: MessageOptions) => {
      message.warning({
        content: msg,
        duration: options?.duration ? options.duration / 1000 : 3
      })
    },
    info: (msg: string, options?: MessageOptions) => {
      message.info({
        content: msg,
        duration: options?.duration ? options.duration / 1000 : 3
      })
    },
    error: (msg: string | MessageOptions, options?: MessageOptions) => {
      if (typeof msg === 'string') {
        message.error({
          content: msg,
          duration: options?.duration ? options.duration / 1000 : 4.5
        })
      } else {
        message.error({
          content: msg.message || '',
          duration: msg.duration ? msg.duration / 1000 : 4.5
        })
      }
    },
    confirm: async (msg: string, title?: string, options?: MessageBoxOptions): Promise<void> => {
      return new Promise((resolve, reject) => {
        AntModal.confirm({
          title: title || '提示',
          content: msg,
          okText: options?.confirmButtonText || '确定',
          cancelText: options?.cancelButtonText || '取消',
          centered: options?.center,
          onOk: () => {
            resolve()
          },
          onCancel: () => {
            reject('cancel')
          }
        })
      })
    },
    alert: async (msg: string, title?: string, options?: MessageBoxOptions): Promise<void> => {
      return new Promise((resolve) => {
        AntModal.info({
          title: title || '提示',
          content: msg,
          okText: options?.confirmButtonText || '确定',
          centered: options?.center,
          onOk: () => {
            resolve()
          }
        })
      })
    }
  }
}

export default AntdAdapter
