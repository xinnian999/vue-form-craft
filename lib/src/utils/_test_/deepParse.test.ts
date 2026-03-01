import { describe, expect, test } from 'vitest'
import { deepParse } from '@/utils'

describe('deepParse - 基础表达式解析', () => {
  test('解析简单的数学表达式', () => {
    expect(deepParse('{{ $values.a + $values.b }}', { $values: { a: 1, b: 2 } })).toBe(3)
  })

  test('解析字符串拼接', () => {
    expect(deepParse('{{ $values.name + "的简介" }}', { $values: { name: '张三' } })).toBe(
      '张三的简介'
    )
  })

  test('解析布尔表达式', () => {
    expect(deepParse('{{ $values.age > 18 }}', { $values: { age: 20 } })).toBe(true)
    expect(deepParse('{{ $values.age > 18 }}', { $values: { age: 15 } })).toBe(false)
  })

  test('解析三元表达式', () => {
    expect(deepParse('{{ $values.age > 18 ? "成年" : "未成年" }}', { $values: { age: 20 } })).toBe(
      '成年'
    )
  })

  test('不包含 {{ }} 的字符串原样返回', () => {
    expect(deepParse('普通字符串', { $values: {} })).toBe('普通字符串')
  })

  test('空字符串返回空字符串', () => {
    expect(deepParse('', { $values: {} })).toBe('')
  })
})

describe('deepParse - 函数解析', () => {
  test('解析箭头函数（单参数）', () => {
    const result = deepParse('{{ () => $values.name }}', { $values: { name: '张三' } })
    expect(typeof result).toBe('function')
    expect(result()).toBe('张三')
  })

  test('解析箭头函数（多行）', () => {
    const multilineFunc = `{{ () => {
  const name = $values.name
  return name + '的简介'
} }}`
    const result = deepParse(multilineFunc, { $values: { name: '李四' } })
    expect(typeof result).toBe('function')
    expect(result()).toBe('李四的简介')
  })

  test('解析普通函数', () => {
    const result = deepParse('{{ function() { return $values.age > 18 } }}', {
      $values: { age: 20 }
    })
    expect(typeof result).toBe('function')
    expect(result()).toBe(true)
  })

  test('函数接收原始参数', () => {
    const result = deepParse('{{ (value) => value * 2 }}', { $values: {} })
    expect(typeof result).toBe('function')
    expect(result(5)).toBe(10)
  })

  test('函数可以访问多个上下文变量', () => {
    const result = deepParse('{{ () => $values.name + $selectData.title }}', {
      $values: { name: '张三' },
      $selectData: { title: '工程师' }
    })
    expect(typeof result).toBe('function')
    expect(result()).toBe('张三工程师')
  })

  test('函数可以调用 $instance 方法', () => {
    const mockInstance = {
      getFieldValue: (path: string) => (path === 'name' ? '王五' : null)
    }
    const result = deepParse('{{ () => $instance.getFieldValue("name") }}', {
      $instance: mockInstance
    })
    expect(typeof result).toBe('function')
    expect(result()).toBe('王五')
  })
})

describe('deepParse - 对象解析', () => {
  test('解析对象中的表达式', () => {
    const obj = {
      placeholder: '{{ $values.name + "的简介" }}',
      disabled: '{{ $values.age < 18 }}',
      value: 'static value'
    }
    const result = deepParse(obj, { $values: { name: '张三', age: 20 } })
    expect(result.placeholder).toBe('张三的简介')
    expect(result.disabled).toBe(false)
    expect(result.value).toBe('static value')
  })

  test('解析对象中的函数', () => {
    const obj = {
      onClick: '{{ () => console.log($values.name) }}',
      onChange: '{{ () => $instance.validate() }}'
    }
    const result = deepParse(obj, { $values: { name: '张三' }, $instance: {} })
    expect(typeof result.onClick).toBe('function')
    expect(typeof result.onChange).toBe('function')
  })

  test('解析嵌套对象', () => {
    const obj = {
      componentProps: {
        placeholder: '{{ $values.name }}',
        disabled: '{{ $values.age < 18 }}'
      }
    }
    const result = deepParse(obj, { $values: { name: '张三', age: 20 } })
    expect(result.componentProps.placeholder).toBe('张三')
    expect(result.componentProps.disabled).toBe(false)
  })
})

describe('deepParse - 数组解析', () => {
  test('解析数组中的表达式', () => {
    const arr = ['{{ $values.a }}', '{{ $values.b }}', 'static']
    const result = deepParse(arr, { $values: { a: 1, b: 2 } })
    expect(result).toEqual([1, 2, 'static'])
  })

  test('解析数组中的对象', () => {
    const arr = [
      { label: '{{ $values.name }}', value: 1 },
      { label: 'static', value: 2 }
    ]
    const result = deepParse(arr, { $values: { name: '张三' } })
    expect(result[0].label).toBe('张三')
    expect(result[1].label).toBe('static')
  })
})

describe('deepParse - 错误处理', () => {
  test('表达式语法错误时返回原字符串', () => {
    const result = deepParse('{{ $values.name + }}', { $values: { name: '张三' } })
    expect(result).toBe('{{ $values.name + }}')
  })

  test('访问不存在的变量返回 undefined', () => {
    const result = deepParse('{{ $values.notExist }}', { $values: {} })
    expect(result).toBe(undefined)
  })

  test('函数语法错误时返回原字符串', () => {
    const result = deepParse('{{ () => { return }}', { $values: {} })
    expect(result).toBe('{{ () => { return }}')
  })
})

describe('deepParse - 复杂场景', () => {
  test('函数联动 - 通过事件处理器实现表单联动', () => {
    // 模拟 $instance 实例方法
    const mockInstance = {
      setFieldValue: (path: string, value: any) => ({ path, value }),
      getFieldValue: (path: string) => (path === 'city' ? '北京' : null),
      validate: () => 'validated'
    }

    // onChange 事件中调用 $instance 方法实现联动
    const onChangeHandler = deepParse(
      `{{ (value) => {
        // 根据省份设置城市
        if (value === '广东') {
          $instance.setFieldValue('city', '广州')
        } else if (value === '北京') {
          $instance.setFieldValue('city', '北京')
        }
        // 触发验证并返回结果
        return $instance.validate()
      } }}`,
      { $instance: mockInstance }
    )

    expect(typeof onChangeHandler).toBe('function')
    const result = onChangeHandler('广东')
    expect(result).toBe('validated')
  })

  test('函数联动 - 复杂的联动逻辑', () => {
    const mockInstance = {
      setFieldValue: (path: string, value: any) => `set ${path} to ${value}`,
      getFieldValue: (path: string) => {
        const data: Record<string, any> = { type: 'personal', age: 25 }
        return data[path]
      }
    }

    // 根据类型动态设置多个字段
    const handler = deepParse(
      `{{ () => {
        const type = $values.type
        if (type === 'company') {
          $instance.setFieldValue('companyName', '必填')
          $instance.setFieldValue('taxNumber', '必填')
        } else {
          $instance.setFieldValue('idCard', '必填')
        }
      } }}`,
      { $values: { type: 'company' }, $instance: mockInstance }
    )

    expect(typeof handler).toBe('function')
    handler()
  })

  test('复杂的多行函数', () => {
    const complexFunc = `{{ (event) => {
  if ($values.age > 18) {
    console.log('成年人')
    return true
  } else {
    console.log('未成年')
    return false
  }
} }}`
    const result = deepParse(complexFunc, { $values: { age: 20 }, $instance: {} })
    expect(typeof result).toBe('function')
    expect(result({ type: 'click' })).toBe(true)
  })

  test('完整的表单配置解析', () => {
    const formConfig = {
      labelWidth: 150,
      items: [
        {
          label: '姓名',
          name: 'name',
          component: 'Input',
          componentProps: {
            placeholder: '{{ $values.type === "edit" ? "请修改姓名" : "请输入姓名" }}',
            disabled: '{{ $values.readonly }}'
          },
          onChange: '{{ () => $instance.validate() }}'
        }
      ]
    }

    const context = {
      $values: { type: 'edit', readonly: false },
      $instance: { validate: () => 'validated' }
    }

    const result = deepParse(formConfig, context)

    expect(result.labelWidth).toBe(150)
    expect(result.items[0].componentProps.placeholder).toBe('请修改姓名')
    expect(result.items[0].componentProps.disabled).toBe(false)
    expect(typeof result.items[0].onChange).toBe('function')
    expect(result.items[0].onChange()).toBe('validated')
  })
})
