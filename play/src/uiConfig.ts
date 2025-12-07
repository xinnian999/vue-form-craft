import { AntdAdapter, ElementPlusAdapter } from 'formora/dev'

export type uiConfig = 'elementPlus' | 'antd'

export const uiConfig = {
  elementPlus: { text: 'Element Plus', adapter: ElementPlusAdapter },
  antd: { text: 'Ant Design Vue', adapter: AntdAdapter }
}
