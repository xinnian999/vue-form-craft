import {
  ElButton,
  ElDialog,
  ElForm,
  ElFormItem,
  ElMessage,
  ElMessageBox,
  ElTooltip,
  ElTabs,
  ElTabPane,
  ElDrawer,
  ElSpace,
  ElDivider
} from 'element-plus'
import { $components, $elements, $options } from '@form-magic/core'
import * as elements from '@/elements'
import { elements as coreElements } from '@form-magic/core'

export default {
  [$options]: {
    lang: 'zh'
  },
  [$elements]: { ...coreElements, ...elements },
  [$components]: {
    successMessage: (msg: string) => ElMessage.success(msg),
    confirm: (msg: string) => ElMessageBox.confirm(msg),
    Button: ElButton,
    Form: ElForm,
    FormItem: ElFormItem,
    Dialog: ElDialog,
    Tooltip: ElTooltip,
    Tabs: ElTabs,
    TabPane: ElTabPane,
    Drawer: ElDrawer,
    Space: ElSpace,
    Divider: ElDivider
  }
}
