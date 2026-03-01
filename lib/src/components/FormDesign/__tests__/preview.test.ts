import { flushPromises } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import aliEcs from '@/templates/aliEcs'
import { FormDesignTest, wait } from '@/utils'

describe('《表单设计器》预览功能测试', async () => {
  it('预览时，linkages attr联动 不会修改原schema', async () => {
    const { previewBtn, wrapper } = FormDesignTest()

    // 设置包含联动的schema
    wrapper.vm.setSchema(aliEcs)

    // 获取原始schema的深拷贝，用于后续对比
    const originalSchema = JSON.parse(JSON.stringify(wrapper.vm.getSchema()))

    // 点击预览按钮
    await previewBtn.trigger('click')
    await flushPromises()
    await wait(500)

    // 查找预览对话框 - el-dialog使用teleport渲染到body
    const previewDialog = wrapper.findComponent({ name: 'Preview' })
    expect(previewDialog.exists()).toBe(true)

    // 验证对话框已打开
    expect(previewDialog.vm.visible).toBe(true)

    // 等待对话框完全渲染
    await flushPromises()
    await wait(1000)

    // 查找预览对话框中的FormRender组件（通过class）
    const formRender = previewDialog.find('.preview-FormRender')
    expect(formRender.exists()).toBe(true)

    // 通过Preview组件的ref获取FormRender实例
    const formRenderInstance = previewDialog.vm.formRef

    expect(formRenderInstance).toBeTruthy()

    // 通过setFieldValue方法设置值来触发联动
    // 设置为"按量付费"
    await formRenderInstance.setFieldValue('payType', 'postpaid')
    await flushPromises()
    await wait(500)

    // 验证联动已触发：应该显示alert提示
    let alertElement = formRender.find('.el-alert')

    expect(alertElement.exists()).toBe(true)
    expect(alertElement.text()).toContain('按量付费实例不支持备案服务')

    // 设置为"抢占式实例"
    await formRenderInstance.setFieldValue('payType', 'spot')
    await flushPromises()
    await wait(500)

    // 验证联动已触发：alert内容应该改变
    alertElement = formRender.find('.el-alert')
    expect(alertElement.exists()).toBe(true)
    expect(alertElement.text()).toContain('使用须知')

    // 设置为"包年包月"
    // await formRenderInstance.setFieldValue('payType', 'year')
    // await flushPromises()
    // await wait(500)

    // 验证联动已触发：alert应该消失
    // alertElement = formRender.find('.el-alert')
    // expect(alertElement.exists()).toBe(false)

    // 关键测试：验证原始schema没有被修改
    const currentSchema = wrapper.vm.getSchema()
    expect(JSON.stringify(currentSchema)).toBe(JSON.stringify(originalSchema))

    // 验证原始schema中的payType字段没有alert属性（初始状态）
    const payTypeItem = currentSchema.items?.[0]?.items?.[0]
    expect(payTypeItem?.name).toBe('payType')
    expect(payTypeItem?.alert).toBeUndefined()
  })
})
