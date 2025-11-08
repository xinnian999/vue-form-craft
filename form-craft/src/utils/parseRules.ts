import type { FormItemRule } from 'element-plus'
import type { RuleItem } from '@/types'

/**
 * 判断字符串是否为正则表达式格式
 */
function isRegexString(str: string): boolean {
  return /^\/.*\/$/.test(str)
}

/**
 * 解析正则表达式字符串
 */
function parseRegexString(str: string): RegExp {
  const match = str.match(/^\/(.*)\/([gimuy]*)$/)
  if (match) {
    return new RegExp(match[1], match[2])
  }
  return new RegExp(str)
}

/**
 * 解析表单规则为 Element Plus / async-validator 兼容的规则数组
 * 支持新格式 { type, value, message, trigger } 和旧格式 { expr, message, trigger }
 * @param rules 规则配置数组
 * @returns Element Plus 兼容的规则数组
 */
export function parseRules(rules?: RuleItem[]): FormItemRule[] {
  if (!rules || rules.length === 0) {
    return []
  }

  const defaultTrigger: ('blur' | 'change')[] = ['blur', 'change']

  return rules.map((rule) => {
    const { type, value, message = '校验不通过', trigger = defaultTrigger } = rule

    const baseRule: FormItemRule = {
      message,
      trigger
    }

    // 兼容旧格式：如果没有 type 但有 expr，自动识别类型
    if (!type && 'expr' in rule) {
      const expr = (rule as any).expr as string

      // 正则表达式
      if (isRegexString(expr)) {
        return {
          ...baseRule,
          pattern: parseRegexString(expr)
        }
      }

      // JS 表达式（布尔值）
      return {
        ...baseRule,
        validator: async () => {
          if (!expr) {
            throw new Error(message)
          }
        }
      }
    }

    // 新格式：根据 type 解析
    switch (type) {
      case 'required':
        return {
          ...baseRule,
          required: true
        }

      case 'min':
        return {
          ...baseRule,
          min: value as number
        }

      case 'max':
        return {
          ...baseRule,
          max: value as number
        }

      case 'pattern':
        return {
          ...baseRule,
          pattern: new RegExp(value as string)
        }

      case 'builtin':
        return {
          ...baseRule,
          type: value as any
        }

      case 'enum': {
        // 如果 value 是字符串（多行文本），需要转换为数组
        const enumValues = typeof value === 'string' 
          ? value.split('\n').map(v => v.trim()).filter(v => v)
          : value
        return {
          ...baseRule,
          enum: enumValues as any[]
        }
      }

      case 'custom':
        // value 是函数体字符串，需要构造成 validator 函数
        return {
          ...baseRule,
          validator: new Function('rule', 'value', 'callback', value as string) as any
        }

      case 'jsExpr':
        // value 是预解析的表达式结果（boolean）
        return {
          ...baseRule,
          validator: async () => {
            if (!value) {
              throw new Error(message)
            }
          }
        }

      default:
        return baseRule
    }
  })
}
