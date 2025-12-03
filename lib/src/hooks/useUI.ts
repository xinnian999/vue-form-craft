import { inject } from 'vue'
import { $uiAdapter } from '@/symbol'
import type { UIAdapter } from '@/types/uiAdapter'
import ElementPlusAdapter from '@/uiAdapter/ElementPlusAdapter'

/**
 * 获取当前使用的 UI 适配器
 * @returns UIAdapter 对象，包含所有适配后的组件
 */
export default function useUI(): UIAdapter {
  const uiAdapter = inject<UIAdapter>($uiAdapter, ElementPlusAdapter)
  return uiAdapter
}
