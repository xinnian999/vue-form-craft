import { AntdAdapter, ElementPlusAdapter } from 'vue-form-craft/dev'

export type uiConfig = 'elementPlus' | 'antd'

export const uiConfig = {
  el: { text: 'Element Plus', adapter: ElementPlusAdapter },
  antd: { text: 'Ant Design Vue', adapter: AntdAdapter }
}
