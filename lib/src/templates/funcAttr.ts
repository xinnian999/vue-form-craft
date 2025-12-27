/**
 * 函数属性传递示例
 *
 * 根据项目规范，函数必须使用 JS 表达式语法："{{ () => { code } }}"
 * 这样可以符合标准 JSON 格式定义
 */

import type { FormSchema } from '@/types'

/**
 * 日期选择器 - 只能选择未来的时间
 *
 * 使用场景：预约系统、活动报名等需要选择未来日期的场景
 */
export const futureDatePickerSchema: FormSchema = {
  submitBtn: true,
  items: [
    {
      label: '预约日期',
      name: 'appointmentDate',
      component: 'DatePicker',
      componentProps: {
        type: 'date',
        placeholder: '只能选择未来日期',
        valueFormat: 'YYYY-MM-DD',
        disabledDate:
          '{{ (time) => { const today = new Date(); today.setHours(0, 0, 0, 0); return time.getTime() < today.getTime(); } }}'
      }
    }
  ]
}

export default futureDatePickerSchema
