import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { FormRender } from '@/components'
import type { FormSchema } from '@/types'

const schema: FormSchema = {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: [
    {
      label: '用户名',
      component: 'Input',
      name: 'username',
      props: {
        placeholder: '请输入用户名'
      }
    },
    {
      label: '年龄',
      component: 'InputNumber',
      name: 'age',
      props: {
        min: 0,
        max: 150
      }
    },
    {
      label: '性别',
      component: 'Radio',
      name: 'gender',
      props: {
        options: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' }
        ]
      }
    },
    {
      label: '爱好',
      component: 'Checkbox',
      name: 'hobbies',
      props: {
        options: [
          { label: '篮球', value: 'basketball' },
          { label: '足球', value: 'football' },
          { label: '游泳', value: 'swimming' }
        ]
      }
    }
  ]
}

describe('《表单渲染器》v-model 双向绑定测试', () => {
  it('外部修改 modelValue 应反映到表单内部', async () => {
    const initialData = {
      username: 'hyl',
      age: 25,
      gender: 'male',
      hobbies: ['basketball']
    }

    const wrapper = mount(FormRender, {
      props: {
        modelValue: initialData,
        'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e }),
        schema
      }
    })

    await nextTick()

    // 验证初始值是否正确渲染
    expect((wrapper.find('input[name="username"]').element as HTMLInputElement).value).toBe('hyl')
    expect(wrapper.props('modelValue')).toEqual(initialData)

    // 外部修改 modelValue
    const updatedData = {
      username: 'zhangsan',
      age: 30,
      gender: 'female',
      hobbies: ['football', 'swimming']
    }

    await wrapper.setProps({ modelValue: updatedData })
    await nextTick()

    // 验证表单内部值已更新
    expect((wrapper.find('input[name="username"]').element as HTMLInputElement).value).toBe(
      'zhangsan'
    )
    expect(wrapper.props('modelValue')).toEqual(updatedData)
  })

  it('表单内部修改应反映到外部 modelValue', async () => {
    const wrapper = mount(FormRender, {
      props: {
        modelValue: {},
        'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e }),
        schema
      }
    })

    await nextTick()

    // 修改用户名
    await wrapper.find('input[name="username"]').setValue('lisi')
    await nextTick()
    expect(wrapper.props('modelValue')).toHaveProperty('username', 'lisi')

    // 继续修改其他字段
    await wrapper.find('input[name="username"]').setValue('wangwu')
    await nextTick()
    expect(wrapper.props('modelValue')).toHaveProperty('username', 'wangwu')
  })

  it('多个字段同时修改应正确同步', async () => {
    const wrapper = mount(FormRender, {
      props: {
        modelValue: {},
        'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e }),
        schema
      }
    })

    await nextTick()

    // 依次修改多个字段
    await wrapper.find('input[name="username"]').setValue('test_user')
    await nextTick()

    expect(wrapper.props('modelValue')).toEqual({
      username: 'test_user'
    })

    // 外部批量更新
    await wrapper.setProps({
      modelValue: {
        username: 'batch_update',
        age: 28,
        gender: 'male'
      }
    })
    await nextTick()

    // 验证所有字段都已更新
    expect((wrapper.find('input[name="username"]').element as HTMLInputElement).value).toBe(
      'batch_update'
    )
    expect(wrapper.props('modelValue')).toEqual({
      username: 'batch_update',
      age: 28,
      gender: 'male'
    })
  })

  it('空值和 undefined 的处理', async () => {
    const wrapper = mount(FormRender, {
      props: {
        modelValue: { username: 'initial' },
        'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e }),
        schema
      }
    })

    await nextTick()
    expect(wrapper.props('modelValue')).toHaveProperty('username', 'initial')

    // 清空字段
    await wrapper.find('input[name="username"]').setValue('')
    await nextTick()
    expect(wrapper.props('modelValue')).toHaveProperty('username', '')

    // 外部设置为空对象
    await wrapper.setProps({ modelValue: {} })
    await nextTick()
    expect((wrapper.find('input[name="username"]').element as HTMLInputElement).value).toBe('')
  })

  it('嵌套对象的双向绑定', async () => {
    const nestedSchema: FormSchema = {
      items: [
        {
          label: '用户信息',
          component: 'Input',
          name: 'user.name'
        },
        {
          label: '用户邮箱',
          component: 'Input',
          name: 'user.email'
        }
      ]
    }

    const wrapper = mount(FormRender, {
      props: {
        modelValue: {},
        'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e }),
        schema: nestedSchema
      }
    })

    await nextTick()

    // 修改嵌套字段
    await wrapper.find('input[name="user.name"]').setValue('nested_user')
    await nextTick()
    expect(wrapper.props('modelValue')).toEqual({
      user: {
        name: 'nested_user'
      }
    })

    // 外部修改嵌套对象
    await wrapper.setProps({
      modelValue: {
        user: {
          name: 'updated_user',
          email: 'test@example.com'
        }
      }
    })
    await nextTick()

    expect((wrapper.find('input[name="user.name"]').element as HTMLInputElement).value).toBe(
      'updated_user'
    )
    expect((wrapper.find('input[name="user.email"]').element as HTMLInputElement).value).toBe(
      'test@example.com'
    )
  })

  it('字段值改变时应触发 onUpdate:modelValue', async () => {
    let updateCallCount = 0
    let lastEmittedValue: any = null

    const wrapper = mount(FormRender, {
      props: {
        modelValue: { username: 'initial', age: 20 },
        'onUpdate:modelValue': (e: any) => {
          updateCallCount++
          lastEmittedValue = e
          wrapper.setProps({ modelValue: e })
        },
        schema
      }
    })

    await nextTick()

    // 验证初始状态未触发更新
    expect(updateCallCount).toBe(0)

    // 修改字段值
    await wrapper.find('input[name="username"]').setValue('changed')
    await nextTick()

    // 验证触发了 onUpdate:modelValue
    expect(updateCallCount).toBe(1)
    expect(lastEmittedValue).toHaveProperty('username', 'changed')

    // 继续修改同一个字段
    await wrapper.find('input[name="username"]').setValue('changed_again')
    await nextTick()

    // 验证再次触发
    expect(updateCallCount).toBe(2)
    expect(lastEmittedValue).toHaveProperty('username', 'changed_again')
  })

  it('嵌套对象字段改变时应触发 onUpdate:modelValue', async () => {
    const nestedSchema: FormSchema = {
      items: [
        {
          label: '用户名',
          component: 'Input',
          name: 'user.name'
        },
        {
          label: '用户年龄',
          component: 'InputNumber',
          name: 'user.age'
        }
      ]
    }

    let updateCallCount = 0
    let lastEmittedValue: any = null

    const wrapper = mount(FormRender, {
      props: {
        modelValue: {
          user: {
            name: 'original',
            age: 25
          }
        },
        'onUpdate:modelValue': (e: any) => {
          updateCallCount++
          lastEmittedValue = e
          wrapper.setProps({ modelValue: e })
        },
        schema: nestedSchema
      }
    })

    await nextTick()

    // 验证初始状态未触发更新
    expect(updateCallCount).toBe(0)

    // 修改嵌套字段
    await wrapper.find('input[name="user.name"]').setValue('modified')
    await nextTick()

    // 验证触发了更新
    expect(updateCallCount).toBe(1)
    expect(lastEmittedValue.user.name).toBe('modified')

    // 继续修改嵌套字段
    await wrapper.find('input[name="user.name"]').setValue('modified_again')
    await nextTick()

    // 验证再次触发
    expect(updateCallCount).toBe(2)
    expect(lastEmittedValue.user.name).toBe('modified_again')
  })
})
