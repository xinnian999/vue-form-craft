/**
 * ========================================
 * Tooltip 悬停提示功能
 * 为字段名提供鼠标悬停描述
 * ========================================
 */

import { FORM_CONFIG_ITEMS, FORM_ITEM_CONFIG_ITEMS } from './items'

/**
 * 根据字段名查找对应的描述信息
 * @param fieldName 字段名
 */
export function getFieldDescription(fieldName: string): string | null {
  // 在所有配置项中查找
  const allItems = [...FORM_CONFIG_ITEMS, ...FORM_ITEM_CONFIG_ITEMS]
  const item = allItems.find(item => item.name === fieldName)
  return item?.meta || null
}

/**
 * 为 Ace 编辑器设置字段悬停提示
 * @param aceEditor Ace 编辑器实例
 */
export function setupTooltip(aceEditor: any) {
  let tooltipElement: HTMLElement | null = null

  // 创建 tooltip 元素
  const createTooltip = () => {
    if (!tooltipElement) {
      tooltipElement = document.createElement('div')
      tooltipElement.id = 'ace-field-tooltip'
      tooltipElement.style.cssText = `
        position: fixed;
        background-color: #333;
        color: #fff;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 12px;
        z-index: 10000;
        pointer-events: none;
        max-width: 300px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: none;
        white-space: nowrap;
      `
      document.body.appendChild(tooltipElement)
    }
    return tooltipElement
  }

  // 显示 tooltip
  const showTooltip = (text: string, x: number, y: number) => {
    const tooltip = createTooltip()
    tooltip.textContent = text
    tooltip.style.display = 'block'
    tooltip.style.left = x + 10 + 'px'
    tooltip.style.top = y + 10 + 'px'
  }

  // 隐藏 tooltip
  const hideTooltip = () => {
    if (tooltipElement) {
      tooltipElement.style.display = 'none'
    }
  }

  // 监听鼠标移动
  aceEditor.container.addEventListener('mousemove', (e: MouseEvent) => {
    try {
      const renderer = aceEditor.renderer
      const screenPos = renderer.screenToTextCoordinates(e.clientX - renderer.gutterWidth, e.clientY)

      if (screenPos.row < 0) {
        hideTooltip()
        return
      }

      const session = aceEditor.session
      const line = session.getLine(screenPos.row)

      if (!line) {
        hideTooltip()
        return
      }

      // 查找当前行所有的字段名
      // 匹配所有 "fieldName": 或 'fieldName': 格式
      const fieldMatches = line.matchAll(/["'](\w+)["']\s*:/g)

      let foundField = false
      for (const match of fieldMatches) {
        if (match.index === undefined) continue

        const fieldName = match[1]
        const endPos = match.index + match[0].length - 1 // 冒号前的位置

        // 检查鼠标是否在这个字段名的范围内（从引号开始到冒号结束）
        if (screenPos.column >= match.index && screenPos.column <= endPos) {
          const description = getFieldDescription(fieldName)

          if (description) {
            showTooltip(`${fieldName}: ${description}`, e.clientX, e.clientY)
            foundField = true
            break
          }
        }
      }

      if (!foundField) {
        hideTooltip()
      }
    } catch (error) {
      hideTooltip()
    }
  })

  // 鼠标离开编辑器时隐藏 tooltip
  aceEditor.container.addEventListener('mouseleave', () => {
    hideTooltip()
  })
}
