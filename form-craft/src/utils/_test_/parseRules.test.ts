import { describe, expect, it } from 'vitest'
import { parseRules } from '../parseRules'

describe('parseRules', () => {
  it('应该返回空数组当没有规则时', () => {
    expect(parseRules()).toEqual([])
    expect(parseRules([])).toEqual([])
  })

  it('应该解析 required 类型', () => {
    const rules = [{ type: 'required' as const, message: '必填字段' }]
    const result = parseRules(rules)
    expect(result[0]).toMatchObject({
      required: true,
      message: '必填字段',
      trigger: 'blur'
    })
  })

  it('应该解析 min 类型', () => {
    const rules = [{ type: 'min' as const, value: 6, message: '至少6位' }]
    const result = parseRules(rules)
    expect(result[0]).toMatchObject({
      min: 6,
      message: '至少6位'
    })
  })

  it('应该解析 max 类型', () => {
    const rules = [{ type: 'max' as const, value: 20, message: '最多20位' }]
    const result = parseRules(rules)
    expect(result[0]).toMatchObject({
      max: 20,
      message: '最多20位'
    })
  })

  it('应该解析 pattern 类型', () => {
    const rules = [{ type: 'pattern' as const, value: '^[0-9]+$', message: '只能输入数字' }]
    const result = parseRules(rules)
    expect(result[0].pattern).toBeInstanceOf(RegExp)
    expect((result[0].pattern as RegExp).source).toBe('^[0-9]+$')
  })

  it('应该解析 enum 类型', () => {
    const rules = [{ type: 'enum' as const, value: ['a', 'b', 'c'], message: '只能选择abc' }]
    const result = parseRules(rules)
    expect(result[0]).toMatchObject({
      enum: ['a', 'b', 'c'],
      message: '只能选择abc'
    })
  })

  it('应该解析 jsExpr 类型', () => {
    const rules = [{ type: 'jsExpr' as const, value: false, message: '表达式校验失败' }]
    const result = parseRules(rules)
    expect(result[0].validator).toBeDefined()
    expect(typeof result[0].validator).toBe('function')
  })

  it('应该使用自定义 trigger', () => {
    const rules = [{ type: 'required' as const, message: '必填', trigger: 'change' as const }]
    const result = parseRules(rules)
    expect(result[0].trigger).toBe('change')
  })

  it('应该使用默认 trigger', () => {
    const rules = [{ type: 'required' as const, message: '必填' }]
    const result = parseRules(rules)
    expect(result[0].trigger).toEqual('blur')
  })
})
