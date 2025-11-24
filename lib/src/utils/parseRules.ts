import type { FormItemRule } from 'element-plus'
import type { RuleItem } from '@/types'

/**
 * 解析表单规则为 Element Plus / async-validator 兼容的规则数组
 * @param rules 规则配置数组
 * @returns Element Plus 兼容的规则数组
 */
export function parseRules(rules?: RuleItem[]): FormItemRule[] {
  if (!rules || rules.length === 0) {
    return []
  }

  return rules.map((rule) => {
    const { type, value, message = '校验不通过', trigger = 'blur' } = rule

    const baseRule: FormItemRule = {
      message,
      trigger
    }

    // 根据 type 解析
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
        const enumValues =
          typeof value === 'string'
            ? value
                .split('\n')
                .map((v) => v.trim())
                .filter((v) => v)
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
