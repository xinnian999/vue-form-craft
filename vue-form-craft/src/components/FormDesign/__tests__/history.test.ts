import { describe, expect, it } from 'vitest'
import { FormDesignTest, wait } from '@/utils'

describe('《表单设计器》历史记录测试', async () => {
  it('（后退/前进）按钮初始化 - 全部禁用', async () => {
    const { backBtn, forwardBtn } = FormDesignTest()

    expect(backBtn.attributes('disabled')).toBeDefined()

    expect(forwardBtn.attributes('disabled')).toBeDefined()
  })

  it('双击添加 - 历史', async () => {
    const { leftWrapper, backBtn, forwardBtn, schema } = FormDesignTest()

    await leftWrapper.find(`.menu-Input`).trigger('dblclick')

    await leftWrapper.find(`.menu-Input`).trigger('dblclick')

    expect(schema.value.items.length).toBe(2)

    await backBtn.trigger('click')

    expect(schema.value.items.length).toBe(1)

    await forwardBtn.trigger('click')

    expect(schema.value.items.length).toBe(2)
  })

  it('清空设计 - 历史', async () => {
    const { leftWrapper, backBtn, forwardBtn, schema, clearBtn } = FormDesignTest()

    await leftWrapper.find(`.menu-Input`).trigger('dblclick')

    await leftWrapper.find(`.menu-Input`).trigger('dblclick')

    expect(schema.value.items.length).toBe(2)

    // 清空设计 + 弹窗确认
    await clearBtn.trigger('click')
    const confirmBtn = document.querySelector(
      '.el-message-box__btns .el-button--primary'
    ) as HTMLButtonElement
    confirmBtn.click()
    await wait(500)

    expect(schema.value.items.length).toBe(0)

    await backBtn.trigger('click')

    expect(schema.value.items.length).toBe(2)

    await forwardBtn.trigger('click')

    expect(schema.value.items.length).toBe(0)
  })
})
