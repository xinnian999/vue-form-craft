import { describe, expect, it } from 'vitest'
import getDataByPath from '../getDataByPath'
import setDataByPath from '../setDataByPath'

describe('getDataByPath 和 setDataByPath 数组索引支持', () => {
  describe('getDataByPath', () => {
    it('应该支持基本的对象路径', () => {
      const obj = { user: { name: 'John' } }
      expect(getDataByPath(obj, 'user.name')).toBe('John')
    })

    it('应该支持数组索引语法 [0]', () => {
      const obj = { rules: [{ required: true }, { min: 6 }] }
      expect(getDataByPath(obj, 'rules[0].required')).toBe(true)
      expect(getDataByPath(obj, 'rules[1].min')).toBe(6)
    })

    it('应该支持嵌套数组', () => {
      const obj = {
        items: [
          { children: [{ name: 'a' }, { name: 'b' }] },
          { children: [{ name: 'c' }] }
        ]
      }
      expect(getDataByPath(obj, 'items[0].children[1].name')).toBe('b')
      expect(getDataByPath(obj, 'items[1].children[0].name')).toBe('c')
    })

    it('应该在路径无效时返回 undefined', () => {
      const obj = { rules: [{ required: true }] }
      expect(getDataByPath(obj, 'rules[5].required')).toBeUndefined()
      expect(getDataByPath(obj, 'rules[0].notExist')).toBeUndefined()
    })

    it('应该支持 . 路径返回整个对象', () => {
      const obj = { test: 'value' }
      expect(getDataByPath(obj, '.')).toBe(obj)
    })
  })

  describe('setDataByPath', () => {
    it('应该支持基本的对象路径', () => {
      const obj = { user: { name: 'John' } }
      const result = setDataByPath(obj, 'user.name', 'Jane')
      expect(result.user.name).toBe('Jane')
      expect(obj.user.name).toBe('Jane') // 直接修改原对象
      expect(result).toBe(obj) // 返回的是同一个对象引用
    })

    it('应该支持数组索引语法 [0]', () => {
      const obj = { rules: [{ required: false }, { min: 6 }] }
      const result = setDataByPath(obj, 'rules[0].required', true)
      expect(result.rules[0].required).toBe(true)
      expect(result.rules[1].min).toBe(6)
      expect(obj.rules[0].required).toBe(true) // 直接修改原对象
      expect(result).toBe(obj) // 返回的是同一个对象引用
    })

    it('应该支持设置数组中的新对象', () => {
      const obj = { rules: [] }
      const result = setDataByPath(obj, 'rules[0].message', '必填字段')
      expect(result.rules[0].message).toBe('必填字段')
    })

    it('应该支持嵌套数组', () => {
      const obj = {
        items: [
          { children: [{ name: 'a' }] }
        ]
      }
      const result = setDataByPath(obj, 'items[0].children[1].name', 'b')
      expect(result.items[0].children[1].name).toBe('b')
    })

    it('应该自动创建不存在的数组和对象', () => {
      const obj = {}
      const result = setDataByPath(obj, 'rules[0].required', true)
      expect(result.rules).toBeInstanceOf(Array)
      expect(result.rules[0]).toBeInstanceOf(Object)
      expect(result.rules[0].required).toBe(true)
    })

    it('应该支持 . 路径返回新值', () => {
      const obj = { test: 'old' }
      const result = setDataByPath(obj, '.', { test: 'new' })
      expect(result.test).toBe('new')
    })

    it('应该支持复杂的校验规则场景', () => {
      const obj = {
        label: '用户名',
        name: 'username',
        rules: []
      }
      
      // 设置 rules[0].required
      let result = setDataByPath(obj, 'rules[0].required', true)
      expect(result.rules[0].required).toBe(true)
      
      // 设置 rules[0].message
      result = setDataByPath(result, 'rules[0].message', '必填字段')
      expect(result.rules[0].required).toBe(true)
      expect(result.rules[0].message).toBe('必填字段')
      
      // 添加第二个规则
      result = setDataByPath(result, 'rules[1].type', 'min')
      result = setDataByPath(result, 'rules[1].value', 6)
      expect(result.rules[1].type).toBe('min')
      expect(result.rules[1].value).toBe(6)
    })
  })

  describe('getDataByPath 和 setDataByPath 配合使用', () => {
    it('应该能够读取刚设置的值', () => {
      const obj = { rules: [] }
      const result = setDataByPath(obj, 'rules[0].required', true)
      expect(getDataByPath(result, 'rules[0].required')).toBe(true)
    })

    it('应该支持校验规则的完整流程', () => {
      let schema = {
        label: '密码',
        name: 'password',
        rules: []
      }
      
      // 添加必填规则
      schema = setDataByPath(schema, 'rules[0].required', true)
      schema = setDataByPath(schema, 'rules[0].message', '密码必填')
      
      // 添加最小长度规则
      schema = setDataByPath(schema, 'rules[1].type', 'min')
      schema = setDataByPath(schema, 'rules[1].value', 8)
      schema = setDataByPath(schema, 'rules[1].message', '至少8位')
      
      // 验证
      expect(getDataByPath(schema, 'rules[0].required')).toBe(true)
      expect(getDataByPath(schema, 'rules[0].message')).toBe('密码必填')
      expect(getDataByPath(schema, 'rules[1].type')).toBe('min')
      expect(getDataByPath(schema, 'rules[1].value')).toBe(8)
      expect(getDataByPath(schema, 'rules[1].message')).toBe('至少8位')
    })
  })
})
