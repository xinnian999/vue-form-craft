import type { FormItemRule } from 'element-plus'
import type { RuleItem } from '@/types'

const LOG_PREFIX = '[vue-form-craft][rules]'
const loggedConfigErrors = new Set<string>()

const createConfigErrorRule = (
  baseRule: FormItemRule,
  fieldName: string | undefined,
  index: number,
  reason: string
): FormItemRule => {
  const msg = `[规则配置错误] ${reason}`
  const fieldText = fieldName ? ` field="${fieldName}"` : ''
  const logKey = `${fieldName ?? ''}|${index}|${reason}`

  if (!loggedConfigErrors.has(logKey)) {
    console.error(`${LOG_PREFIX}${fieldText} rules[${index}] ${reason}`)
    loggedConfigErrors.add(logKey)
  }

  return {
    ...baseRule,
    message: msg,
    validator: (_rule, _value, callback) => {
      callback(new Error(msg))
    }
  }
}

/**
 * 解析表单规则为 Element Plus / async-validator 兼容的规则数组
 * @param rules 规则配置数组
 * @param fieldName 当前字段名（用于错误定位）
 * @returns Element Plus 兼容的规则数组
 */
export function parseRules(rules?: RuleItem[], fieldName?: string): FormItemRule[] {
  if (!rules || rules.length === 0) {
    return []
  }

  return rules.map((rule, index) => {
    const { type, value, message = '校验不通过', trigger = 'blur' } = rule

    const baseRule: FormItemRule = {
      message,
      trigger
    }

    if (!type) {
      return createConfigErrorRule(baseRule, fieldName, index, '缺少 type')
    }

    // 根据 type 解析
    switch (type) {
      case 'required':
        return {
          ...baseRule,
          required: true
        }

      case 'min':
        if (typeof value !== 'number') {
          return createConfigErrorRule(baseRule, fieldName, index, 'type=min 时 value 必须是 number')
        }
        return {
          ...baseRule,
          min: value
        }

      case 'max':
        if (typeof value !== 'number') {
          return createConfigErrorRule(baseRule, fieldName, index, 'type=max 时 value 必须是 number')
        }
        return {
          ...baseRule,
          max: value
        }

      case 'pattern': {
        if (value instanceof RegExp) {
          return {
            ...baseRule,
            pattern: value
          }
        }

        if (typeof value !== 'string') {
          return createConfigErrorRule(
            baseRule,
            fieldName,
            index,
            'type=pattern 时 value 必须是正则字符串'
          )
        }

        try {
          return {
            ...baseRule,
            pattern: new RegExp(value)
          }
        } catch {
          return createConfigErrorRule(
            baseRule,
            fieldName,
            index,
            'type=pattern 的 value 不是合法正则'
          )
        }
      }

      case 'builtin':
        if (typeof value !== 'string' || value.trim() === '') {
          return createConfigErrorRule(
            baseRule,
            fieldName,
            index,
            'type=builtin 时 value 必须是非空字符串'
          )
        }
        return {
          ...baseRule,
          type: value as any
        }

      case 'enum': {
        // 如果 value 是字符串（多行文本），需要转换为数组
        const enumValues =
          typeof value === 'string'
            ? value
                .split('\n')
                .map((v) => v.trim())
                .filter((v) => v)
            : value

        if (!Array.isArray(enumValues) || enumValues.length === 0) {
          return createConfigErrorRule(
            baseRule,
            fieldName,
            index,
            'type=enum 时 value 必须是非空数组或可拆分为数组的字符串'
          )
        }

        return {
          ...baseRule,
          enum: enumValues
        }
      }

      case 'custom': {
        // 兼容兜底：给出明确错误，避免 AI 写了 validator 字段后静默通过
        if ('validator' in (rule as Record<string, any>)) {
          return createConfigErrorRule(
            baseRule,
            fieldName,
            index,
            'type=custom 不支持 validator 字段，请使用 value（函数体字符串或函数）'
          )
        }

        if (typeof value === 'function') {
          return {
            ...baseRule,
            validator: value as any
          }
        }

        if (typeof value !== 'string' || value.trim() === '') {
          return createConfigErrorRule(
            baseRule,
            fieldName,
            index,
            'type=custom 时 value 必须是函数体字符串或函数'
          )
        }

        try {
          return {
            ...baseRule,
            validator: new Function('rule', 'value', 'callback', value) as any
          }
        } catch {
          return createConfigErrorRule(
            baseRule,
            fieldName,
            index,
            'type=custom 的 value 不是合法函数体'
          )
        }
      }

      case 'jsExpr':
        if (typeof value !== 'boolean') {
          return createConfigErrorRule(
            baseRule,
            fieldName,
            index,
            'type=jsExpr 时 value 必须是 boolean（通常由 {{ 表达式 }} 解析得到）'
          )
        }
        // value 是预解析的表达式结果（boolean）
        return {
          ...baseRule,
          validator: (_rule, _value, callback) => {
            if (!value) {
              callback(new Error(message))
              return
            }
            callback()
          }
        }

      default:
        return createConfigErrorRule(
          baseRule,
          fieldName,
          index,
          `不支持的规则类型: ${String(type)}`
        )
    }
  })
}
